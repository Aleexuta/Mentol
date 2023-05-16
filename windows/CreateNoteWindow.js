import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import colors1 from '../colors/colors';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-elements';
import {createNote} from '../Database/SQLiteScreen ';
const CreateNoteWindow = ({navigation}) => {
  return (
    <View style={styles.implicit}>
      <View style={styles.buttonPart}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.pop();
          }}>
          <Icon name={'arrow-left'} color="black" size={30} />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            createNote('texxxxt', '13-12-2000');
          }}>
          <Icon name={'check'} color="black" size={30} />
        </Pressable>
      </View>
      <View>
        <View>
          <Text></Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  implicit: {
    backgroundColor: colors1.COLOR_background,
    padding: 10,
    flex: 1,
  },
  buttonPart: {
    flex: 0.2,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textPart: {
    flex: 0.8,
    margin: 10,
    backgroundColor: colors1.COLOR_item,
  },
  button: {
    margin: 10,
  },
});

export default CreateNoteWindow;
