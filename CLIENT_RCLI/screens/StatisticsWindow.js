/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import colors1 from '../colors/colors';
import {VictoryChart, VictoryLine, VictoryLegend} from 'victory-native';
import {Dimensions} from 'react-native';
import {listNotes} from '../Database/SQLiteScreen ';

const classLabels = {
  0: 'addiction',
  1: 'adhd',
  2: 'autism',
  3: 'bipolarreddit',
  4: 'bpd',
  5: 'depression',
  6: 'EDAnonymous',
  7: 'healthanxiety',
  8: 'lonely',
  9: 'ptsd',
  10: 'schizophrenia',
  11: 'socialanxiety',
  12: 'suicidewatch',
};
function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}
const transformData = inputData => {
  const transformedData = inputData.map(({id, date, result}) => {
    if (result != null) {
      const probabilities = JSON.parse(result).multi_class[0];
      const formattedProbabilities = {};

      probabilities.forEach((probability, index) => {
        const label = classLabels[index];
        formattedProbabilities[label] = probability;
      });
      return {
        date: addDays(new Date(date), id), // Convert date string to Date object
        probabilities: formattedProbabilities,
      };
    }
  });
  // console.log(transformedData);
  return transformedData;
};
const {width, height} = Dimensions.get('window');
const chartWidth = width;
const chartHeight = height * 0.5;

const StatisticsWindows = () => {
  const [data, setData] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {};
    }, []),
  );

  const fetchData = async () => {
    try {
      const notes = await listNotes(); // Call the listNotes function
      const newNotes = transformData(notes);
      setData(newNotes);
    } catch (error) {
      console.error(error);
    }
  };
  const labels = Object.keys(data[0]?.probabilities || {});
  const colors = [
    '#0000FF',
    '#FF0000',
    '#00FF00',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFA500',
    '#800080',
    '#008000',
    '#FFC0CB',
    '#FF4500',
    '#800000',
    '#1FE0A0',
  ];
  return (
    <View style={styles.implicit}>
      <Text
        style={{fontSize: 30, textAlign: 'center', color: colors1.COLOR_text}}>
        Statistics
      </Text>
      <VictoryChart width={chartWidth} height={chartHeight}>
        {labels.map((label, index) => (
          <VictoryLine
            key={label}
            data={data.map(({date, probabilities}) => ({
              x: date,
              y: probabilities[label],
            }))}
            style={{
              data: {stroke: colors[index]},
            }}
          />
        ))}
      </VictoryChart>
      <VictoryLegend
        x={width / 8}
        y={0}
        orientation="vertical"
        gutter={60}
        itemsPerRow={7}
        data={labels.map((label, index) => ({
          name: label,
          symbol: {fill: colors[index]},
        }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  implicit: {
    paddingTop: 30,
    backgroundColor: colors1.COLOR_background,
    flex: 1,
  },
});

export default StatisticsWindows;
