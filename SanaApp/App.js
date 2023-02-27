import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from './components/NavBar/NavBar.js';
import RecordMood from './components/RecordMood/RecordMood';
import HomeScreen from './components/HomeScreen/HomeScreen.js';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/*TODO: Views must be conditional on user input.
         For now, comment out `RecordMood` or other
         component present and add yours for testing. */}
      {/* <HomeScreen /> */}
      <RecordMood />
      <NavBar /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});
