import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors1 from '../colors/colors';

const PhoneNumbersWindow = () => {
  return (
    <View style={styles.implicit}>
      <Text>StatisticsWindow</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  implicit: {
    backgroundColor: colors1.COLOR_background,
    flex: 1,
  },
});

export default PhoneNumbersWindow;
