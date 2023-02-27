import { StyleSheet, Button, Text, View } from 'react-native';
import {useState} from 'react';
import CheckBox from 'expo-checkbox';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
// import uuid from 'react-native-uuid';
// import { Asset } from 'expo-asset';

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

async function openDatabase(pathToDatabaseFile) {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  /* Use code segment if attempting to read data from project directory. 
     Project directory and file system document directory are not equal. */
  // await FileSystem.downloadAsync(
  //   Asset.fromModule(require(pathToDatabaseFile)).uri,
  //   FileSystem.documentDirectory + 'SQLite/mood.db'
  // );
  const db = SQLite.openDatabase('sana.db');

  /* Check if moods table exists. Otherwise, create it. */
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS moods \
      (id INTEGER PRIMARY KEY AUTOINCREMENT,\
       userID INT,\
       date STRING,\
       moods STRING)'
    )
  });

  return db;
}

const db = openDatabase('');

function moodHandler(isCheckedHappy, isCheckedSad, isCheckedAngry) {
  var userMoods= [];
  if (isCheckedHappy) userMoods.push("happy");
  if (isCheckedSad) userMoods.push("sad");
  if (isCheckedAngry) userMoods.push("angry");
  var userEntry = {
    // id: uuid.v1(),
    userID: '0', // TODO: using fake userID. Update later. 
    date: Date.now(),
    moods: userMoods,
  };
  console.log('Moods Entry:\n' + JSON.stringify(userEntry));
  console.log('Attempting to insert into db...\n');
  db.transaction(tx => {
    console.log("Made it into the transaction!");
    tx.executeSql(
      'INSERT INTO moods (userID, date, moods) values (?, ?, ?)',
      [userEntry.userID, userEntry.date, userEntry.moods],
      (txObj, resultSet) => console.log("Updated moods table: " + txObj + resultSet),
      (txObj, error) => console.log('moodHandler Error', error)
    )
  });
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
