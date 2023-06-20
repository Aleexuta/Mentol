import React, { useState } from "react";
import { View } from "react-native";
import NotesWindow from "./screens/NotesWindow";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome5";
import colors1 from "./colors/colors";
import MenuWindow from "./screens/MenuWindow";
import StatisticsWindows from "./screens/StatisticsWindow";
import EditWindow from "./screens/EditWindow";
import CreateNoteWindow from "./screens/CreateNoteWindow";
import { createNoteTable } from "./Database/SQLiteScreen ";
import ResultNoteWindow from "./screens/ResultNoteWindow";
import AgendaWindow from "./screens/AgendaWindow";
const Tab = createBottomTabNavigator();

const NoteStack = createStackNavigator();
const NotesNavigator = () => {
  return (
    <NoteStack.Navigator>
      <NoteStack.Screen
        name="NotesList"
        options={{
          headerShown: false,
        }}
        component={NotesWindow}
      />
      <NoteStack.Screen
        name="AddNote"
        options={{
          headerShown: false,
        }}
        component={CreateNoteWindow}
      />
      <NoteStack.Screen
        name="EditNote"
        options={{
          headerShown: false,
        }}
        component={EditWindow}
      />
      <NoteStack.Screen
        name="Result"
        options={{
          headerShown: false,
        }}
        component={ResultNoteWindow}
      />
    </NoteStack.Navigator>
  );
};

const MenuStack = createStackNavigator();
const MenuNavigator = () => {
  return (
    <MenuStack.Navigator initialRouteName="MenuWindow">
      <MenuStack.Screen
        name="MenuWindow"
        options={{
          headerShown: false,
        }}
        component={MenuWindow}
      />
      <MenuStack.Screen
        name="Agenda"
        options={{
          headerShown: false,
        }}
        component={AgendaWindow}
      />
    </MenuStack.Navigator>
  );
};

const App = () => {
 React.useEffect(() => {
    createNoteTable();
  },[]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors1.COLOR_background,
        paddingTop: 50,
      }}
    >
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Notes"
          screenOptions={({ route }) => ({
            tabBarHideOnKeyboard: true,
            tabBarInactiveTintColor: "black",
            tabBarActiveTintColor: "#FFD469",
            tabBarStyle: {
              backgroundColor: "transparent",
              borderTopWidth: 0,
              position: "absolute",
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Notes") {
                iconName = focused ? "clipboard" : "clipboard";
              } else if (route.name === "Menu") {
                iconName = focused ? "bars" : "bars";
              } else if (route.name === "Statistics") {
                iconName = focused ? "chart-line" : "chart-line";
              }
              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="Menu"
            component={MenuNavigator}
            options={{
              headerShown: false,
              tabBarItemStyle: {
                backgroundColor: colors1.COLOR_navbar,
                borderTopRightRadius: 100,
                bottom: 30,
                paddingBottom: 40,
                paddingTop: 20,
                height: 100,
                paddingRight: 30,
                transform: [{ scaleX: 1.1 }],
              },
            }}
          />
          <Tab.Screen
            name="Notes"
            component={NotesNavigator}
            options={{
              headerShown: false,
              tabBarItemStyle: {
                backgroundColor: colors1.COLOR_navbar,
                borderTopRightRadius: 100,
                borderTopLeftRadius: 100,
                bottom: 30,
                paddingBottom: 40,
                paddingTop: 20,
                height: 100,
                paddingRight: 20,
                paddingLeft: 20,
                transform: [{ scaleX: 1.2 }],
              },
            }}
          />
          <Tab.Screen
            name="Statistics"
            component={StatisticsWindows}
            options={{
              headerShown: false,
              tabBarItemStyle: {
                backgroundColor: colors1.COLOR_navbar,
                borderTopLeftRadius: 100,
                bottom: 30,
                paddingBottom: 40,
                paddingTop: 20,
                height: 100,
                paddingLeft: 30,
                transform: [{ scaleX: 1.1 }],
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
