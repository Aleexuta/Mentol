import * as React from "react";
import { StyleSheet, View, Text, Alert, BackHandler,ToastAndroid } from "react-native";
import colors1 from "../colors/colors";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Icon from "react-native-vector-icons/FontAwesome5";

import { createNote } from "../Database/SQLiteScreen ";
import { TextInput } from "react-native-gesture-handler";
import { getPredictions } from "../predict";

const CreateNoteWindow = ({ navigation }) => {
  const [showBox, setShowBox] = React.useState(true);

  const [note, setNote] = React.useState("");
  const showConfirmDialog = () => {
    if (note === "") {
      navigation.pop();
      return true;
    }
    Alert.alert("Are your sure?", "Your are still editing", [
      // The "Yes" button
      {
        text: "Yes",
        onPress: () => {
          navigation.pop();
          setShowBox(false);
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]);
    return true;
  };

  const backActionHandler = () => {
    console.log("P" + note.length);
    if (note.length === 0) {
      //nu mere
      navigation.pop();

      setShowBox(false);
      console.log("press" + note + "...");
      return true;
    } else {
      Alert.alert("Are your sure?", "Your are still editing", [
        {
          text: "Yes",
          onPress: () => {
            navigation.pop();
            setShowBox(false);
          },
        },
        { text: "No" },
      ]);
      return true;
    }
  };

  React.useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, []);
  const handlePredictions = async (note) => {
    ToastAndroid.showWithGravity(
      'The result is loading...',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    const result = await getPredictions(note.toString());
    ToastAndroid.showWithGravity(
      `The result is: ${result}`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };
  const handleNewNote = () => {
    const formattedDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    handlePredictions(note.toString());
    createNote(note.toString(), formattedDate);
    navigation.pop();
  };
  return (
    <View style={styles.implicit}>
      <View style={styles.buttonPart}>
        <Pressable
          style={styles.button}
          onPress={() => {
            showConfirmDialog();
          }}
        >
          <Icon name={"arrow-left"} color="black" size={30} />
        </Pressable>
        <View style={{ flexDirection: "row" }}>
          <Pressable
            style={styles.button}
            onPress={() => {
              handleNewNote();
            }}
          >
            <Icon name={"check"} color="black" size={30} />
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
            multiline={true}
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
    flexDirection: "row",
    justifyContent: "space-between",
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
