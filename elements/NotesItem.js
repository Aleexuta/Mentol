import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors1 from '../colors/colors';

const NotesItem = () => {
  return (
    <View style={styles.completView}>
      <View style={styles.coloredPart}>
        <Text style={styles.textNote}></Text>
      </View>
      <Text style={styles.textData}>Data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  completView: {
    flex: 0.5,
    margin: 7,
    backgroundColFor: colors1.COLOR_background,
    maxHeight: 180,
    // flexWrap: 'wrap',
  },
  coloredPart: {
    backgroundColor: colors1.COLOR_item,
    // borderTopLeftRadius: 7,
    // borderTopRightRadius: 7,
    borderRadius: 10,
    shadowColor: '#000',
    maxHeight: 150,
    elevation: 6,
  },
  textNote: {
    color: 'black',
    opacity: 0.6,
    alignSelf: 'flex-start',
    margin: 5,
  },
  textData: {
    color: 'black',
    alignSelf: 'center',
    marginTop: 2,
  },
});

export default NotesItem;
