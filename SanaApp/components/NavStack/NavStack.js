import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../HomeScreen/HomeScreen.js';
import Login from '../AuthScreens/Login';
import Signup from '../AuthScreens/Signup.js';
import RecordMood from '../RecordMood/RecordMood';
import Create from '../Journal/Create';
import SubmittedEntry from '../Journal/SubmittedEntry.js';
import Settings from '../SettingsScreen/Settings';
import test from '../AuthScreens/testscreen.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const homeName = 'homeName';
const recordMoodName = 'Record Mood';
const createName = 'Create';
const myJournalName = 'My Journal';
const settingsName = 'Settings';

const Home = () => {
    return(
        <Tab.Navigator
        initialRouteName={homeName}
    screenOptions={({ route }, ) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;

        if (rn === HomeScreen) {
          iconName = focused ? 'home' : 'home-outline';

        } else if (rn === recordMoodName) {
          iconName = focused ? 'record mood' : 'record-mood-outline';
        } 
          else if (rn === myJournalName) {
            iconName = focused ? 'my journal' : 'my-journal-outline';
        }
        else if (rn === createName) {
          iconName = focused ? 'create' : 'create-outline';
        }
          else if (rn == settingsName) {
            iconName = focused ? 'settings' : 'settings-outline';
          

        } 
        // add more conditionals for other screens here

        // You can return any component that you like here!
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
    <Tab.Screen name={myJournalName} component={SubmittedEntry} />
    <Tab.Screen name={settingsName} component={Settings} />
    {/* Add more navigation icons here */}

  </Tab.Navigator>
    )
}

const NavStack = () => {
    return(
        <Stack.Navigator screenOptions= {{headerShown: false}}>
            {/* <Stack.Screen name="test" component={test}/> */}

            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Signup" component={Signup}/>
            {/* <Stack.Screen name="HomeScreen" component={HomeScreen}/> */}
            <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{ headerShown: false }}
        />
        </Stack.Navigator>
    );
}


export default NavStack;