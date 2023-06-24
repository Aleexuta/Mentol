import * as React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import colors1 from '../colors/colors';

const NotesItem = (props, navigation) => {
  const date = new Date(props.props.date);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  const formattedDate = `${day}/${month}/${year}`;

  return (
    <View style={styles.completView}>
      <Pressable
        onPress={() => {
          // console.log(props.navigation);
          props.navigation.push('EditNote', {props: props.props});
        }}>
        <View style={styles.coloredPart}>
          <Text style={styles.textNote}>{props.props.note}</Text>
        </View>
      </Pressable>
      <Text style={styles.textData}>{formattedDate}</Text>
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
