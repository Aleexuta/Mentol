import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import colors1 from "../colors/colors";

const MenuWindow = ({navigation}) => {
  return (
    <View style={styles.implicit}>
      <Text style={{ fontSize: 30, textAlign: "center" }}>Menu</Text>
      <View style={styles.inside}>
        <View style={styles.buttonView}>
          {/* <Pressable
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed
                  ? colors1.COLOR_item_pressed
                  : colors1.COLOR_item,
              },
            ]}
          >
            <Text style={styles.text}>See last note result</Text>
          </Pressable> */}
          <Pressable onPress={()=>{navigation.push('Agenda')}}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed
                  ? colors1.COLOR_item_pressed
                  : colors1.COLOR_item,
              },
            ]}
          >
            <Text style={styles.text}>Emergency phone numbers</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  implicit: {
    paddingTop: 30,
    backgroundColor: colors1.COLOR_background,
    flex: 1,
  },
  inside: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: colors1.COLOR_navbar,
    width: "90%",
    height: "70%",
    borderRadius: 20,
    shadowColor: "#000",
    elevation: 6,
  },
  buttonView: {
    marginTop: 100,
    justifyContent: "center",
    padding: 20,
  },
  button: {
    padding: 20,
    backgroundColor: colors1.COLOR_item,
    margin: 5,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 6,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default MenuWindow;
