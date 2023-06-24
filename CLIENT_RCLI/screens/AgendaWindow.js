import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import colors1 from '../colors/colors';

const AgendaWindow = () => {
  return (
    <View style={styles.implicit}>
      <Text
        style={{fontSize: 30, textAlign: 'center', color: colors1.COLOR_text}}>
        Agenda
      </Text>
      <View style={styles.inside}>
        <Text style={styles.text}>
          Freephone helpline for specialist help{'\n'} 0800.500.333
        </Text>
        <Text style={styles.text}>Single emergency number {'\n'}112</Text>
        <Text style={styles.text}>
          The Romanian Alliance for Suicide Prevention{'\n'} 0800.801.200
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  implicit: {
    paddingTop: 30,
    backgroundColor: colors1.COLOR_background,
    flex: 1,
  },
  inside: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: colors1.COLOR_navbar,
    width: '90%',
    height: '70%',
    borderRadius: 20,
    shadowColor: '#000',
    elevation: 6,
    padding: 20,
  },

  text: {
    color: colors1.COLOR_text,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default AgendaWindow;
