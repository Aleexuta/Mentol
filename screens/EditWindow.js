import * as React from 'react';
import {StyleSheet, View, Text, Alert, BackHandler} from 'react-native';
import colors1 from '../colors/colors';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {updateNote, deleteNote} from '../Database/SQLiteScreen ';
import {TextInput} from 'react-native-gesture-handler';
import {Menu, Divider, PaperProvider} from 'react-native-paper';
const EditWindow = props => {
  console.log(props.route.params.props);
  const [note, setNote] = React.useState(props.route.params.props.note);
  const [visible, setVisible] = React.useState(false);
  const [showBox, setShowBox] = React.useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  //console.log(props);
  const showConfirmDialog = () => {
    if (note === '') {
      props.navigation.pop();
      return true;
    }
    Alert.alert('Are your sure?', 'Your are still editing', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          props.navigation.pop();
          setShowBox(false);
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No',
      },
    ]);
    return true;
  };

  const backActionHandler = () => {
    console.log('P' + note.length);
    if (note.length === 0) {
      //nu mere
      props.navigation.pop();

      setShowBox(false);
      console.log('press' + note + '...');
      return true;
    } else {
      Alert.alert('Are your sure?', 'Your are still editing', [
        {
          text: 'Yes',
          onPress: () => {
            props.navigation.pop();
            setShowBox(false);
          },
        },
        {text: 'No'},
      ]);
      return true;
    }
  };
  React.useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener('hardwareBackPress', backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
  }, []);
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
                const formattedDate = new Date().toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                });
                const result=7;
                updateNote(note.toString(), formattedDate,result);
                props.navigation.pop();
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
                title="Delete note"
              />
              <Menu.Item onPress={() => {props.navigation.push('Result',props=props.route.params.props)}} title="Details" />
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
    size: 16,
    fontSize: 25,
  },
  menuContainerInside: {
    padding: 10,
    backgroundColor: colors1.COLOR_navbar,
  },
  menuContainer: {
    marginTop:20
  },
});

export default EditWindow;
