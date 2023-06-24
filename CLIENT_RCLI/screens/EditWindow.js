import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import colors1 from '../colors/colors';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {updateNote, deleteNote} from '../Database/SQLiteScreen ';
import {TextInput} from 'react-native-gesture-handler';
import {Menu, Divider, PaperProvider} from 'react-native-paper';
import {getPredictions} from '../predict';

const EditWindow = props => {
  // console.log(props.route.params.props);
  const [note, setNote] = React.useState(props.route.params.props.note);
  const [visible, setVisible] = React.useState(false);
  const [showBox, setShowBox] = React.useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  //console.log(props);
  const showConfirmDialog = () => {
    // if (note === '') {
    props.navigation.pop();
    return true;
  };

  const backActionHandler = () => {
    // console.log('P' + note.length);
    // if (note.length === 0) {
    //nu mere
    props.navigation.pop();

    setShowBox(false);
  };
  React.useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener('hardwareBackPress', backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
  }, []);
  const handlePredictions = async note => {
    ToastAndroid.showWithGravity(
      'The result is loading...',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    const result = await getPredictions(note.toString());
    return result;
  };
  const handleNewNote = async () => {
    const formattedDate = new Date();

    props.navigation.pop();
    const result = await handlePredictions(note.toString());
    // console.log(result)
    updateNote(
      note.toString(),
      formattedDate.toString(),
      JSON.stringify(result),
    );
    ToastAndroid.showWithGravity(
      'The result is ready...',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    //props.navigation.pop();
  };
  return (
    <PaperProvider>
      <View style={styles.implicit}>
        <View style={styles.buttonPart}>
          <Pressable
            style={styles.button}
            onPress={() => {
              showConfirmDialog();
            }}>
            <Icon name={'arrow-left'} color="black" size={30} />
          </Pressable>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={styles.button}
              onPress={() => {
                handleNewNote();
              }}>
              <Icon name={'check'} color="black" size={30} />
            </Pressable>
            <Menu
              statusBarHeight={0}
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    openMenu();
                  }}>
                  <Icon name={'ellipsis-v'} color="black" size={30} />
                </Pressable>
              }
              style={styles.menuContainer}
              contentStyle={styles.menuContainerInside}>
              <Menu.Item
                onPress={() => {
                  Alert.alert('Are your sure?', 'The note will be deleted', [
                    {
                      text: 'Yes',
                      onPress: () => {
                        deleteNote(props.route.params.props.id);
                        props.navigation.pop();
                        setShowBox(false);
                      },
                    },
                    {
                      text: 'No',
                    },
                  ]);
                }}
                titleStyle={{color: colors1.COLOR_text}}
                title="Delete note"
              />
              <Menu.Item
                onPress={() => {
                  props.navigation.push(
                    'Result',
                    (props = props.route.params.props),
                  );
                }}
                titleStyle={{color: colors1.COLOR_text}}
                title="Details"
              />
            </Menu>
          </View>
        </View>

        <View style={styles.textPart}>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={setNote}
              value={note}
              placeholder="Edit text"
              multiline={true}
            />
          </View>
        </View>
      </View>
    </PaperProvider>
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
    fontSize: 25,
  },
  menuContainerInside: {
    padding: 10,
    backgroundColor: colors1.COLOR_navbar,
  },
  menuContainer: {
    marginTop: 20,
  },
});

export default EditWindow;
