import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors1 from '../colors/colors';

const MenuWindow = () => {
  return (
    <View style={styles.implicit}>
      <Text>Menu Window</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  implicit: {
    backgroundColor: colors1.COLOR_background,
    flex: 1,
  },
});

export default MenuWindow;
