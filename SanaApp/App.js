// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from './components/NavBar - not used/NavBar.js';
import { NavigationContainer } from '@react-navigation/native';
import NavStack from './components/NavStack/NavStack.js';

export default function App() {
  return (
    <NavigationContainer>
      <NavStack/>
      {/* <NavBar/> */}
    </NavigationContainer>

    // uncomment the things below to test individually (lines 14-21) and comment out line 9 
    // -- might also want to comment out line 3

    // <View style={styles.container}>
    //   <StatusBar style="auto" />
    //   {/*TODO: Views must be conditional on user input.
    //      For now, comment out `RecordMood` or other
    //      component present and add yours for testing. */}
    //   {/* <HomeScreen /> */}
    //   <RecordMood />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});
