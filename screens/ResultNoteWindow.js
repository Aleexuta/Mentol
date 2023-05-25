import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import colors1 from "../colors/colors";
import { Dimensions } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryLegend,
} from "victory-native";

const ResultNoteWindow = (props) => {
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  //const data = props.result[0];
  const data = [
    { x: "Does not suffer from mental conditions", y: 40 },
    { x: "Suffer from mental conditions", y: 60 },
  ];
  const dataMenal = [
    { x: "Label 1", y: 10 },
    { x: "Label 2", y: 20 },
    { x: "Label 3", y: 30 },
    { x: "Label 4", y: 40 },
    { x: "Label 5", y: 50 },
    { x: "Label 6", y: 60 },
    { x: "Label 7", y: 70 },
    { x: "Label 8", y: 80 },
    { x: "Label 9", y: 90 },
    { x: "Label 10", y: 100 },
    { x: "Label 11", y: 110 },
    { x: "Label 12", y: 120 },
    { x: "Label 13", y: 130 },
  ];
  console.log(props.route.params);
  const backActionHandler = () => {
    props.navigation.pop();
    return true;
  };
  React.useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, []);

  const colors = ["#8D8DE6", "#7373E9"];
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.implicit}>
          <Text style={{ fontSize: 30, textAlign: "center" }}>Results</Text>
          <View style={styles.dateView}>
            <Text style={styles.text}>{props.route.params.date}</Text>
          </View>
          <View style={styles.noteView}>
            <Text style={styles.text}>{props.route.params.note}</Text>
          </View>
          <View>
            <View >
              <VictoryPie
                data={data}
                colorScale={colors}
                labels={({ datum }) => `${datum.y}%`}
              />
            </View>
            <View>
              <VictoryLegend
                x={30}
                y={0}
                orientation="vertical"
                gutter={10}
                data={data.map(({ x }) => ({ name: x }))}
                colorScale={colors}
                height={150}
              />
            </View>
          </View>
          <View>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ y: 20 }}
              padding={{ left: 80, top: 20, right: 20, bottom: 40 }}
              horizontal
            >
              <VictoryBar
                data={dataMenal}
                style={{ data: { fill: colors1.COLOR_navbar } }}
                alignment="start"
                barWidth={20}
              />
            </VictoryChart>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  implicit: {
    flex: 1,
    backgroundColor: colors1.COLOR_background,
    paddingBottom: 150,
  },
  dateView: {
    height: 50,
    borderWidth: 1,
    borderColor: colors1.COLOR_item,
    margin: 20,
  },
  noteView: {
    borderWidth: 1,
    borderColor: colors1.COLOR_item,
    margin: 20,
  },
  chartView: {
    height: 400,
    backgroundColor: "pink",
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});
export default ResultNoteWindow;
