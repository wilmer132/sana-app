import { StyleSheet, Button, Text, View } from 'react-native';
import {useState} from 'react';
import CheckBox from 'expo-checkbox';

const styles = StyleSheet.create({
  container: {
    height: '88%',
    backgroundColor: "white",
  },
  innerView: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPrompt: {
    marginBottom: 10,
    fontSize: '25',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '20',
  },
  moodChoice: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function moodHandler(isCheckedHappy, isCheckedSad, isCheckedAngry) {
  var userMoods= [];
  if (isCheckedHappy) userMoods.push("happy");
  if (isCheckedSad) userMoods.push("sad");
  if (isCheckedAngry) userMoods.push("angry");
  console.log('Moods Recorded: ' + userMoods);
}

export default function RecordMood() {
  {/* Hard-coded feelings for first iteration. */}
  const [isCheckedHappy, setCheckedHappy] = useState(false)
  const [isCheckedSad, setCheckedSad] = useState(false)
  const [isCheckedAngry, setCheckedAngry] = useState(false)
  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        <Text style={styles.textPrompt}>
          How are you feeling today?
        </Text>
        <View style={styles.moodChoice}>
          <CheckBox
            value={isCheckedHappy}
            onValueChange={setCheckedHappy}
            color={isCheckedHappy ? 'purple' : undefined}
          />
          <Text>&nbsp;&nbsp;</Text>
          <Text style={styles.text}>Happy</Text>
        </View>
        <View style={styles.moodChoice}>
          <CheckBox
            value={isCheckedSad}
            onValueChange={setCheckedSad}
            color={isCheckedSad ? 'purple' : undefined}
          />
          <Text>&nbsp;&nbsp;</Text>
          <Text style={styles.text}>Sad</Text>
        </View>
        <View style={styles.moodChoice}>
          <CheckBox
            value={isCheckedAngry}
            onValueChange={setCheckedAngry}
            color={isCheckedAngry ? 'purple' : undefined}
          />
          <Text>&nbsp;&nbsp;</Text>
          <Text style={styles.text}>Angry</Text>
        </View>
      </View>
      {(isCheckedHappy || isCheckedSad || isCheckedAngry) ?
      <Button
        title="Record Mood"
        onPress={ () => moodHandler(isCheckedHappy, isCheckedSad, isCheckedAngry)}
      /> : undefined}
    </View> 
  );
}
