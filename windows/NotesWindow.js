import React from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import colors1 from '../colors/colors';
import NotesItem from '../elements/NotesItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {listNotes} from '../Database/SQLiteScreen ';

const NotesWindows = ({navigation}) => {
  const items = [1, 2, 3];
  return (
    <View style={styles.implicit}>
      <View style={styles.topbar}>
        <Pressable onPress={() => navigation.push('AddNote')}>
          <Icon name={'plus'} color="black" size={30} brand />
        </Pressable>
      </View>
      <FlatList
        style={{margin: 5}}
        data={items}
        numColumns={2}
        keyExtractor={(item, index) => item.id}
        renderItem={item => <NotesItem />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    margin: 5,
    marginLeft: 20,
  },
  implicit: {
    backgroundColor: colors1.COLOR_background,
    flex: 1,
    padding: 10,
    paddingTop: 20,
  },
});
export default NotesWindows;
