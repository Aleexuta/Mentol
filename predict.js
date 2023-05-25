import * as tf from "@tensorflow/tfjs";
import {
  fetch,
  decodeJpeg,
  bundleResourceIO,
} from "@tensorflow/tfjs-react-native";

const modelJson = require("./assets/model/model.json");
const modelWeights = require("./assets/model/group-shard.bin");

const loadModel = async () => {
  const model = await tf
    .loadLayersModel(bundleResourceIO(modelJson, modelWeights))
    .catch((e) => {
      console.log("[LOADING ERROR] info:", e);
    });
  return model;
};
const processingData = (text) => {
  //tokenization
  let lexer = new Tokenizer();

  lexer.rule(/[a-zA-Z_][a-zA-Z0-9_]*/, (ctx, match) => {
    ctx.accept("id");
  });
  lexer.rule(/[+-]?[0-9]+/, (ctx, match) => {
    ctx.accept("number", parseInt(match[0]));
  });
  lexer.rule(/"((?:\\"|[^\r\n])*)"/, (ctx, match) => {
    ctx.accept("string", match[1].replace(/\\"/g, '"'));
  });
  lexer.rule(/\/\/[^\r\n]*\r?\n/, (ctx, match) => {
    ctx.ignore();
  });
  lexer.rule(/[ \t\r\n]+/, (ctx, match) => {
    ctx.ignore();
  });
  lexer.rule(/./, (ctx, match) => {
    ctx.accept("char");
  });
  lexer.input(text);
  return lexer.tokens().map((v) => v.value);
};
const doTokenization = (text) => {};
const doPadding = (text) => {};
const makePredictions = async (batch, model, textTensor) => {
  // console.log(model.summary());
  // textPreprocessed = processingData(textTensor);
  // console.log(textPreprocessed);
  // textTokenizedAndPadded = doPadding(doTokenization(textPreprocessed));
  // console.log(textTokenizedAndPadded);

  const textTensorHardCodded = '[366, 178, 2111, 462, 64, 709, 826, 366, 178, 2111, 512, 71, 72, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0,],';
  textTensor=textTensorHardCodded
  const textTensorArray = [textTensor]; // Wrap the array in another array to create a batch
  console.log(textTensor.length);
  const numbersString = textTensor.replace(/[\[\] ]/g, "");
  // Split the string by commas
  const numbersArray = numbersString.split(",");
  // Parse each number as an integer
  const numbers = numbersArray.map(Number);

  const splitSize = 70; // Number of entries in each split

  const splitData = [];
  for (let i = 0; i < numbers.length; i += splitSize) {
    const split = numbers.slice(i, i + splitSize);
    splitData.push(split);
  }

  console.log(splitData[0]);

  console.log(splitData[0].length);
  // Create the tf.Tensor2D object
  const inputTensor = tf.tensor2d(splitData[0], [1, 70], "int32");

  const predictionsdata = model.predict(inputTensor);

  const cleanedTensorString = predictionsdata.toString().replace(/,]/g, "]");

  // Parse the cleaned tensor string into a JavaScript array
  const nS = cleanedTensorString.slice(14, -2);
  const nA = nS.split(",");

  // Parse each number as a float
  const floatArray = nA.map((num) => parseFloat(num));

  console.log("Pred " + floatArray[0]);
  //let pred = predictionsdata.split(batch); //split by batch size

  // Get the values as a regular JavaScript array
  const argmaxArray = floatArray.indexOf(Math.max(...floatArray));

  console.log("ARGMAX " + argmaxArray); // Output: [11]
  //return predictions
  return argmaxArray;
  return 6;
};

export const getPredictions = async (text) => {
  await tf.ready();
  const model = await loadModel();
  console.log(text);
  const predictions = await makePredictions(1, model, text);
  console.log("Pred  " + predictions);
  //const pred_label = np.argmax(predictions, axis=1)
  return predictions;
};
