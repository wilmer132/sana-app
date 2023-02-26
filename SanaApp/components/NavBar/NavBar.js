import {View, Text} from 'react-native';
import { StyleSheet } from 'react-native';

const navStyle = StyleSheet.create({
  container: {
    height: '12%',
    width: '100%',
    borderStyle: 'solid',
    backgroundColor: 'purple',
  }
});

export default function NavBar() {
  return (
    <View
      style={navStyle.container}>
      <Text>Hello World!</Text>
    </View>
  );
};

