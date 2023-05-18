import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import colors1 from '../colors/colors';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-elements';
import {createNote} from '../Database/SQLiteScreen ';
import {TextInput} from 'react-native-gesture-handler';
import {color} from 'react-native-elements/dist/helpers';

const CreateNoteWindow = ({navigation}) => {
  const [note, setNote] = React.useState('');
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
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={styles.button}
            onPress={() => {
              const formattedDate = new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              });
              createNote(note.toString(), formattedDate);
              navigation.pop();
            }}>
            <Icon name={'check'} color="black" size={30} />
          </Pressable>
          <Pressable style={styles.button} onPress={() => {}}>
            <Icon name={'ellipsis-v'} color="black" size={30} />
          </Pressable>
        </View>
      </View>
      <View style={styles.textPart}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setNote}
            value={note}
            placeholder="Edit text"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  implicit: {
    backgroundColor: colors1.COLOR_background,
    padding: 10,
    paddingBottom: 0,
    flex: 1,
  },
  buttonPart: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textPart: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: colors1.COLOR_item,
  },
  button: {
    margin: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  input: {
    color: colors1.COLOR_text,
    padding: 10,
    size: 16,
    fontSize: 25,
  },
});

export default CreateNoteWindow;
