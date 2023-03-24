import * as React from 'react';
import {View, Text} from 'react-native';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-ionicons'

// screens
import RecordMood from '../RecordMood/RecordMood';
import HomeScreen from '../HomeScreen/HomeScreen';
import Create from '../Journal/Create';
import SubmittedEntry from '../Journal/SubmittedEntry';

// screen names
const homeName = 'Home';
const recordMoodName = 'Record Mood';
const createName = 'Create';
const myJournalName = 'My Journal';

const Tab = createBottomTabNavigator();

const navStyle = StyleSheet.create({
  container: {
    height: '12%',
    width: '100%',
    borderStyle: 'solid',
    backgroundColor: '#3950A1',
  }
});

export default function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === recordMoodName) {
              iconName = focused ? 'record mood' : 'record-mood-outline';

            } else if (rn === createName) {
              iconName = focused ? 'create' : 'create-outline';
            
            } else if (rn === myJournalName) {
              iconName = focused ? 'my journal' : 'my-journal-outline';
            } 
            // add more conditionals for other screens here

            // You can return any component that you like here! (will add in future when adding icons)
            // return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#3950A1',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={recordMoodName} component={RecordMood} />
        <Tab.Screen name={createName} component={Create} />
        <Tab.Screen name={myJournalName} component={MyJournal} />
        {/* Add more navigation icons here */}

      </Tab.Navigator>
    </NavigationContainer>

  );
};

