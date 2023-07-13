import axios from 'axios';

export const getPredictions = text => {
  return new Promise((resolve, reject) => {
    axios
      .post('http://192.168.147.1:5000/predict', {
        textToPredict: text,
      })
      .then(function (response) {
        // console.log(response.data);
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};
