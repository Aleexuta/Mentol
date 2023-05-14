import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import colors1 from '../colors/colors';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Icon from 'react-native-vector-icons/FontAwesome5';
const CreateNoteWindow = ({navigation}) => {
  return (
    <View style={styles.implicit}>
      <View>
        <Pressable onPress={navigation.pop()}>
          <Icon name={'back'} size={30} color="black" />
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
  },
  textPart: {
    flex: 0.8,
    margin: 10,
    backgroundColor: colors1.COLOR_item,
  },
});

export default CreateNoteWindow;
