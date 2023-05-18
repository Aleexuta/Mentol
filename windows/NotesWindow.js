import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import colors1 from '../colors/colors';
import NotesItem from '../elements/NotesItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {listNotes} from '../Database/SQLiteScreen ';

const NotesWindows = ({navigation}) => {
  const [data, setData] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {};
    }, []),
  );

  const fetchData = async () => {
    try {
      const notes = await listNotes(); // Call the listNotes function
      setData(notes);
    } catch (error) {
      console.error(error);
    }
  };
  const handleNewItem = async () => {
    // Add new item to the database

    navigation.push('AddNote');
    // Fetch the updated data from the database
    try {
      const notes = await listNotes();
      setData(notes);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.implicit}>
      <View style={styles.topbar}>
        <Pressable
          onPress={() => {
            handleNewItem();
          }}>
          <Icon name={'plus'} color="black" size={30} brand />
        </Pressable>
      </View>
      <FlatList
        style={{margin: 5}}
        data={data}
        numColumns={2}
        renderItem={({item}) => <NotesItem props={item} />}
        keyExtractor={item => item.id}
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
