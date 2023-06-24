from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from transformers import BertTokenizer,TFBertForSequenceClassification
import json
import numpy as np
import re 
import string
import nltk
from nltk import  word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer


app = Flask(__name__)  # Setup the flask app by creating an instance of 


def convert_lowercase(text):
    text = text.lower()
    return text
def remove_url(text):
    re_url = re.compile('https?://\S+|www\.\S+')
    return re_url.sub('', text)
exclude = string.punctuation

def remove_punc(text):
    return text.translate(str.maketrans('', '', exclude))
def remove_stopwords(text):
    new_list = []
    words = word_tokenize(text)
    stopwrds = stopwords.words('english')
    for word in words:
        if word not in stopwrds:
            new_list.append(word)
    return ' '.join(new_list)
def lemmatize_words(text):
    lemmatizer = WordNetLemmatizer()
    words = text.split()
    words = [lemmatizer.lemmatize(word,pos='v') for word in words]
    return ' '.join(words)
def preprocessed(text):
    text = convert_lowercase(text)
    text = remove_url(text)
    text = remove_punc(text)
    text = remove_stopwords(text)
    # text = lemmatize_words(text)
    return text

vocab_size=5000
oov_tok = '<OOV>'
MAX_SEQUENCE_LENGTH =300
trunc_type = 'post'
padding_type = 'post'

modelBinar = tf.keras.models.load_model('model_2classes.h5')
modelBert = TFBertForSequenceClassification.from_pretrained("./BERT")
with open('word_index.json') as f:
    word_indexBinar = json.load(f)

tokenizerBinar = Tokenizer(num_words=vocab_size, oov_token = oov_tok)
tokenizerBinar.word_index=word_indexBinar

bert_tokenizer = BertTokenizer.from_pretrained("bert-base-uncased",use_auth_token="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")
@app.route('/')  # When someone goes to / on the server, execute the following function
def home():

    return 'Hello, World!'  # Return this message back to the browser

@app.route('/predict', methods=['POST'])
def predict(): 
    if request.method == 'POST':
        data=request.data.decode('utf-8')
        json_object = json.loads(data)
        text=json_object['textToPredict']

        text=preprocessed(text)
        
        sequences = tokenizerBinar.texts_to_sequences([text])
        padded_sequences = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH,
                                        padding=padding_type, truncating=trunc_type)

        predictions = modelBinar.predict(padded_sequences)
        logits_exp = np.exp(predictions - np.max(predictions, axis=1, keepdims=True))
        prob_binar = logits_exp / np.sum(logits_exp, axis=1, keepdims=True)
        prob_binar_formatted = np.round(prob_binar, 2)
        
        # Assuming binary classification, return the predicted class (0 or 1)
        predicted_class = int(np.argmax(predictions[0]))
        print(prob_binar_formatted)
        
        probabilities_formatted=np.zeros((1,13))
        if predicted_class == 0:
                text_bert=bert_tokenizer.encode_plus(text,add_special_tokens = True,max_length =64,
                                            pad_to_max_length = True,return_attention_mask = True)

                input=[]
                input.append(text_bert['input_ids'])
                attention=[]
                attention.append(text_bert['attention_mask'])
                predictionsBert=modelBert.predict([np.asarray(input),np.array(attention)], verbose=1)
                logits = predictionsBert.logits
                logits_exp = np.exp(logits - np.max(logits, axis=1, keepdims=True))
                probabilities = logits_exp / np.sum(logits_exp, axis=1, keepdims=True)
                probabilities_formatted = np.round(probabilities, 2)
                print(probabilities_formatted)
                # class_labels = np.argmax(predictionsBert[0], axis=1)

                # predicted_class=int(class_labels[0])
                # print(predicted_class)
        else:
            predicted_class=-1
        return jsonify({"binar_class": prob_binar_formatted.tolist(),"multi_class":probabilities_formatted.tolist()})




# if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
#     app.run()  # Start the server