import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import colors1 from "../colors/colors";
import {
  VictoryChart,
  VictoryLine,
  VictoryLegend,
  VictoryAxis,
  VictoryZoomContainer,
} from "victory-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const chartWidth = width;
const chartHeight = height * 0.5;
const data = [
  {
    date: new Date(2023, 0, 1),
    probabilities: {
      depression: 0.5,
      suicidewatch: 0.03,
      adhd: 0.12,
      bpd: 0.03,
      lonely: 0.02,
      socialanxiety: 0.12,
      EDAnonymous: 0.01,
      autism: 0.01,
      schizophrenia: 0.01,
      healthanxiety: 0.03,
      ptsd: 0.06,
      addiction: 0.06,
    },
  },
  {
    date: new Date(2023, 0, 2),
    probabilities: {
      depression: 0.2,
      suicidewatch: 0.3,
      adhd: 0.1,
      bpd: 0.2,
      lonely: 0.1,
      socialanxiety: 0.1,
      EDAnonymous: 0.0,
      autism: 0.0,
      schizophrenia: 0.0,
      healthanxiety: 0.0,
      ptsd: 0.0,
      addiction: 0.0,
    },
  },
  {
    date: new Date(2023, 0, 4),
    probabilities: {
      depression: 0.25,
      suicidewatch: 0.15,
      adhd: 0.2,
      bpd: 0.1,
      lonely: 0.2,
      socialanxiety: 0.1,
      EDAnonymous: 0.0,
      autism: 0.0,
      schizophrenia: 0.0,
      healthanxiety: 0.0,
      ptsd: 0.0,
      addiction: 0.0,
    },
  },
  {
    date: new Date(2023, 0, 6),
    probabilities: {
      depression: 0.1,
      suicidewatch: 0.1,
      adhd: 0.2,
      bpd: 0.2,
      lonely: 0.2,
      socialanxiety: 0.2,
      EDAnonymous: 0.0,
      autism: 0.0,
      schizophrenia: 0.0,
      healthanxiety: 0.0,
      ptsd: 0.0,
      addiction: 0.0,
    },
  },
  {
    date: new Date(2023, 0, 9),
    probabilities: {
      depression: 0.15,
      suicidewatch: 0.1,
      adhd: 0.1,
      bpd: 0.15,
      lonely: 0.15,
      socialanxiety: 0.15,
      EDAnonymous: 0.1,
      autism: 0.05,
      schizophrenia: 0.05,
      healthanxiety: 0.05,
      ptsd: 0.0,
      addiction: 0.0,
    },
  },
];
const StatisticsWindows = () => {
  const labels = Object.keys(data[0].probabilities);
  const colors = [
    "#0000FF",
    "#FF0000",
    "#00FF00",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
    "#FFC0CB",
    "#FF4500",
    "#800000",
    "#FF1493",
  ];
  return (
    <View style={styles.implicit}>
      <Text style={{ fontSize: 30, textAlign: "center" }}>Statistics</Text>
      <VictoryChart width={chartWidth} height={chartHeight}>
        {labels.map((label, index) => (
          <VictoryLine
            key={label}
            data={data.map(({ date, probabilities }) => ({
              x: date,
              y: probabilities[label],
            }))}
            style={{
              data: { stroke: colors[index] },
            }}
            labels={() => ""}
          />
        ))}
      </VictoryChart>
      <VictoryLegend
        x={width / 8}
        y={0}
        orientation="vertical"
        gutter={60}
        itemsPerRow={6}
        data={labels.map((label, index) => ({
          name: label,
          symbol: { fill: colors[index] },
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
