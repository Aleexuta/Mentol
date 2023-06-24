import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import * as tf from '@tensorflow/tfjs';
import {
  fetch,
  decodeJpeg,
  bundleResourceIO,
} from '@tensorflow/tfjs-react-native';
import {getPredictions} from '../predict';

const PredictWindow = () => {
  const [result, setResult] = useState('NIMIC');
  const [text, setText] = useState('----');
  const handleButtonPress = async () => {
    const predictions = await getPredictions(text); // Call your getPredictions function here

    // Set the prediction result in the state
    setResult(predictions);
  };
  return (
    <View style={{backgroundColor: 'red'}}>
      <Text
        style={{
          height: 300,
          backgroundColor: 'gray',
          alignContent: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          textAlignVertical: 'center',
        }}>
        {result}
      </Text>

      <TextInput value={text} onChangeText={text => setText(text)} multiline />
      <Button title="Apasa ma" onPress={() => handleButtonPress()} />
    </View>
  );
};

export default PredictWindow;
