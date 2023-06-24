import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import colors1 from '../colors/colors';
import {Dimensions} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryLegend,
} from 'victory-native';

const ResultNoteWindow = props => {
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  //const data = props.result[0];

  const res = props.route.params.result;
  console.log(res);
  const binarClassData = JSON.parse(res).binar_class[0];
  const multiClassData = JSON.parse(res).multi_class[0];
  console.log(binarClassData);
  console.log(multiClassData);
  const data = [
    {x: 'Suffer from mental conditions', y: binarClassData[0].toFixed(2)},
    {
      x: 'Does not suffer from mental conditions',
      y: binarClassData[1].toFixed(2),
    },
  ];

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

  const dataMenal = Object.keys(classLabels).map(key => ({
    x: classLabels[key],
    y: multiClassData[key] !== 0 ? multiClassData[key] : 0,
  }));
  console.log(multiClassData[0]);
  const backActionHandler = () => {
    props.navigation.pop();
    return true;
  };
  React.useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener('hardwareBackPress', backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
  }, []);

  const colors = [colors1.COLOR_navbar, colors1.COLOR_item];
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.implicit}>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              color: colors1.COLOR_text,
            }}>
            Results
          </Text>
          <View style={styles.dateView}>
            <Text style={styles.text}>
              {new Date(props.route.params.date).toLocaleDateString('en-GB')}
            </Text>
          </View>
          <View style={styles.noteView}>
            <Text style={styles.text}>{props.route.params.note}</Text>
          </View>
          <View>
            <View>
              <VictoryPie
                data={data}
                colorScale={colors}
                labels={({datum}) => `${datum.y}%`}
              />
            </View>
            <View>
              <VictoryLegend
                x={30}
                y={0}
                orientation="vertical"
                gutter={10}
                data={data.map(({x}) => ({name: x}))}
                colorScale={colors}
                height={150}
              />
            </View>
          </View>
          <View>
            {binarClassData[0] > binarClassData[1] && (
              <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{y: 20}}
                padding={{left: 100, top: 20, right: 20, bottom: 40}}
                horizontal>
                <VictoryBar
                  data={dataMenal}
                  style={{data: {fill: colors1.COLOR_navbar}}}
                  barWidth={20}
                />
              </VictoryChart>
            )}
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
    backgroundColor: 'pink',
    alignSelf: 'center',
  },
  text: {
    color: colors1.COLOR_text,
    fontSize: 20,
    textAlign: 'center',
  },
});
export default ResultNoteWindow;
