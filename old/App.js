/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack';

import NotesWindows from './windows/NotesWindow';
import StatisticsWindows from './windows/StatisticsWindow';
import colors1 from './colors/colors';
import MenuWindow from './windows/MenuWindow';

import SQLite from 'react-native-sqlite-storage';
import CreateNoteWindow from './windows/CreateNoteWindow';
import {createNoteTable} from './Database/SQLiteScreen ';
import EditWindow from './windows/EditWindow';
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
        component={NotesWindows}
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
    </NoteStack.Navigator>
  );
};

const App = () => {
  React.useEffect(() => {
    createNoteTable();
  });
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Notes"
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: '#FFD469',
          tabBarStyle: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            position: 'absolute',
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Notes') {
              iconName = focused ? 'clipboard' : 'clipboard';
            } else if (route.name === 'Menu') {
              iconName = focused ? 'bars' : 'bars';
            } else if (route.name === 'Statistics') {
              iconName = focused ? 'chart-line' : 'chart-line';
            }
            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen
          name="Menu"
          component={MenuWindow}
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
              transform: [{scaleX: 1.1}],
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
              transform: [{scaleX: 1.2}],
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
              transform: [{scaleX: 1.1}],
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tab: {
    backgroundColor: colors1.COLOR_navbar,
    color: colors1.COLOR_navbar,
  },
});

export default App;
