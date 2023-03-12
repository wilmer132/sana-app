import { StyleSheet, Button, Text, View } from 'react-native';
import {useState, useEffect} from 'react';
import CheckBox from 'expo-checkbox';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { WebSQLDatabase } from 'expo-sqlite';
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
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
  },
  moodChoice: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordButtonView: {
    marginTop: 20,
    backgroundColor: 'purple'
  },
});

async function openDatabase(): Promise<SQLite.WebSQLDatabase> {
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

  /* Temporary: Clear/truncate data from table moods to start afresh. */
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM moods'
    );
  });

  return db;
}

const db = openDatabase();

function moodHandler(isCheckedHappy: boolean, isCheckedSad: boolean,
  isCheckedAngry: boolean) {
  var userMoods: string[] = [];
  if (isCheckedHappy) userMoods.push("happy");
  if (isCheckedSad) userMoods.push("sad");
  if (isCheckedAngry) userMoods.push("angry");
  var userEntry: any = {
    // id: uuid.v1(),
    userID: '0', // TODO: using fake userID. Update later. 
    date: Date.now(),
    moods: userMoods,
  };
  console.log('Moods Entry:\n' + JSON.stringify(userEntry));
  db.then((wdb: WebSQLDatabase) => {
    wdb.transaction(tx => {
      tx.executeSql(
        'INSERT INTO moods (userID, date, moods) values (?, ?, ?)',
        [userEntry.userID, userEntry.date, userEntry.moods]
      );
    });
  });
  db.then((wbd: WebSQLDatabase) => {
    wbd.transaction(tx => {
      tx.executeSql(
        'SELECT * from moods',
        [],
        (tx, result) => {
          console.log("Current db:\n", result.rows);
        }
      )
    })
  });
}

export default function RecordMood() {
  /* Hard-coded feelings for first iteration. */
  const [isCheckedHappy, setCheckedHappy] = useState(false)
  const [isCheckedSad, setCheckedSad] = useState(false)
  const [isCheckedAngry, setCheckedAngry] = useState(false)

  /* Check if moods table exists. Otherwise, create it. */
  useEffect(() => {
    db.then((wdb: WebSQLDatabase) => {
      wdb.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS moods\
           (id INTEGER PRIMARY KEY NOT NULL,\
           userID INT,\
           date TEXT,\
           moods TEXT);"
        );
      });
    });
  }, []);

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
        {(isCheckedHappy || isCheckedSad || isCheckedAngry) ?
          <View style={styles.recordButtonView}>
            <Button
            color={'white'}
            title="Record Mood"
            onPress={ () => moodHandler(isCheckedHappy, isCheckedSad, isCheckedAngry)}
            />
          </View>:
        null}
      </View>
    </View> 
  );
};
