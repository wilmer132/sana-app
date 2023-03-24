import { StyleSheet, Button, Text, Modal, Pressable, TextInput, View } from 'react-native';
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
  addMoodButton: {
    marginTop: '3%',
    marginRight: '35%',
    alignItems: 'flex-start',
    backgroundColor: '#BBEEFF',
  },
  closeModalButton: {
    backgroundColor: '#FF737E',
  },
  submitModalButton: {
    backgroundColor: '#BBEEFF',
  },
  recordButtonView: {
    marginTop: 20,
    backgroundColor: 'purple'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: '60%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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

  /* Temporary: Delete entire table if structural changes were made. */
  // db.transaction(tx => {
  //   tx.executeSql(
  //     'DROP TABLE IF EXISTS moodEntries'
  //   );
  //   tx.executeSql(
  //     'DROP TABLE IF EXISTS moods'
  //   );
  // });

  /* Temporary: Clear/truncate data from table moods to start afresh. */
  // db.transaction(tx => {
  //   tx.executeSql(
  //     'DELETE from moodEntries'
  //   );
  //   tx.executeSql(
  //     'DELETE from moods'
  //   );
  // });

  return db;
}

function setupDatabase() {
  db.then((wdb: WebSQLDatabase) => {
    wdb.transaction(tx => {
      /* Set up initial moodEntries table for entry recording. */
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS moodEntries\
          (id INTEGER PRIMARY KEY NOT NULL,\
          userID INT,\
          date TEXT,\
          moods TEXT);"
      );
      /* Set up moods table and initial values for user customization. */
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS moods\
          (id INTEGER PRIMARY KEY NOT NULL,\
          name TEXT UNIQUE,\
          value INT,\
          UNIQUE(name));",
          [],
          (tx, result) => {
            console.log("moods table either already exists, or it was created.");
            /*
            BEWARE: ONLY RUN ONCE.
            Add initial mood choices.
            Convention: Mood value ranges from 1 (Detrimental) - 5 (Benefitial).
            */
            tx.executeSql(
              'INSERT OR IGNORE INTO moods (name, value) values (?, ?)',
              ['Happy', 5]
            );
            tx.executeSql(
              'INSERT OR IGNORE INTO moods (name, value) values (?, ?)',
              ['Sad', 2]
            );
            tx.executeSql(
              'INSERT OR IGNORE INTO moods (name, value) values (?, ?)',
              ['Angry', 2],
              (tx, result) => console.log('Added moods: ', result),
              (tx, error) => {
                console.log ('Error adding moods: ', error);
                return false;
              }
            );
          },
          (tx, error) => {
            console.log (error);
            return false;
          }
      );
    });
  });
}

function moodHandler(userMoodsCheckList: any[]) {
  var userMoods: string[] = [];
  userMoodsCheckList.map((userMoodItem: any) => {
    if (userMoodItem.selected) {
      userMoods.push(userMoodItem.name);
    }
  });
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
        'INSERT INTO moodEntries (userID, date, moods) values (?, ?, ?)',
        [userEntry.userID, userEntry.date, userEntry.moods]
      );
    });
  });
  db.then((wbd: WebSQLDatabase) => {
    wbd.transaction(tx => {
      tx.executeSql(
        'SELECT * from moodEntries',
        [],
        (tx, result) => {
          console.log("Current moodEntries db:\n", result.rows);
        }
      )
    })
  });
}

/* Setup data before starting RecordMood Component. */
const db = openDatabase();
setupDatabase();

export default function RecordMood() {
  const [moodChoices, setMoodChoices] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [anyMoodSelected, setAnyMoodSelected] = useState(0);
  const [customMoodName, setCustomMoodName] = useState('');
  const [customMoodValue, setCustomMoodValue] = useState('');
  /* Check if moods table exists. Otherwise, create it. */
  useEffect(() => {
    /* Load mood choices */
    db.then((wbd: WebSQLDatabase) => {
      wbd.transaction(tx => {
        tx.executeSql(
          'SELECT * from moods',
          [],
          (tx, result) => {
            const loadedMoods: any[] = [];
            result.rows._array.forEach((row) => {
              const loadedMood = {
                name: row['name'],
                value: row['value'],
                selected: false,
              };
              loadedMoods.push(loadedMood);
            });
            setMoodChoices(loadedMoods);
            setAnyMoodSelected(0);
            console.log("mood choices now: ", moodChoices);
          }
        );
      });
    });
  
    db.then((wdb: WebSQLDatabase) => {
      wdb.transaction(tx => {
        /* Temporary: Verify table structure if errors. */
        // tx.executeSql(
        //   'PRAGMA table_info(`moods`)',
        //   [],
        //   (tx, result) => {
        //     console.log("Current moods struct:\n", result.rows);
        //   }
        // );

        tx.executeSql(
          'SELECT * from moods',
          [],
          (tx, result) => {
            console.log("Current moods:\n", result.rows);
          }
        );
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        {/* Modal for adding custom moods. */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          style={styles.modalView}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Add Custom Mood</Text>
              <Text>&nbsp;</Text>
              <Text>Mood Name:</Text>
              <TextInput
                  placeholder="Enter mood name"
                  placeholderTextColor='gray'
                  value={customMoodName}
                  onChangeText={(text) => {
                    setCustomMoodName(text);
                  }}
              />
              <Text>&nbsp;</Text>
              <Text>Mood Value (1-5)</Text>
              <Text>(1=terrible, 5=amazing)</Text>
              <TextInput
                  placeholder="Enter mood value"
                  placeholderTextColor='gray'
                  value={customMoodValue}
                  onChangeText={(text) => {
                    setCustomMoodValue(text);
                  }}
              />
              <Text>&nbsp;&nbsp;</Text>
              <Pressable
                style={styles.submitModalButton}
                onPress={() => {
                  console.log("Submitting new mood...");
                  db.then((wdb: WebSQLDatabase) => {
                    wdb.transaction(tx => {
                      let customVal = parseInt(customMoodValue) || 0
                      tx.executeSql(
                        'INSERT INTO moods (name, value) values (?, ?)',
                        [customMoodName, customVal],
                        (tx, result) => {
                          console.log("Inserted custom mood: ", result);
                          tx.executeSql(
                            'SELECT * from moods',
                            [],
                            (tx, result) => {
                              const loadedMoods: any[] = [];
                              result.rows._array.forEach((row) => {
                                const loadedMood = {
                                  name: row['name'],
                                  value: row['value'],
                                  selected: false,
                                };
                                loadedMoods.push(loadedMood);
                              });
                              setMoodChoices(loadedMoods);
                              setAnyMoodSelected(0);
                              console.log("mood choices now: ", moodChoices);
                            }
                          );
                          setCustomMoodName('');
                          setCustomMoodValue('');
                          setModalVisible(!modalVisible)
                        },
                        (tx, error) => {
                          console.log("Error:", error);
                          return false;
                        }
                      );
                    });
                  })
                }}>
                <Text>Add New Mood</Text>
              </Pressable>
              <Text>&nbsp;&nbsp;</Text>
              <Pressable
                style={styles.closeModalButton}
                onPress={() => {
                  setCustomMoodName('');
                  setCustomMoodValue('');
                  setModalVisible(!modalVisible)
                }}>
                <Text>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* View for recording moods. */}
        <Text style={styles.textPrompt}>
          How are you feeling today?
        </Text>
        {moodChoices.map((value, index) => {
          return (
            <View style={styles.moodChoice}>
              <CheckBox
                value={value.selected}
                onValueChange={() => {
                  const newMoodChoices = [...moodChoices]
                  newMoodChoices[index].selected = !newMoodChoices[index].selected
                  if (newMoodChoices[index].selected) {
                    setAnyMoodSelected(anyMoodSelected + 1);
                  } else {
                    setAnyMoodSelected(anyMoodSelected - 1);
                  }
                  setMoodChoices(newMoodChoices)
                }}
                color={moodChoices[index].selected ? 'purple': undefined}
              />
              <Text>&nbsp;&nbsp;</Text>
              <Text style={styles.text}>{value.name}</Text>
            </View>
          );
        })}
        <View style={styles.addMoodButton}>
          <Button
            title="+ Add Mood"
            color="black"
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </View>
        {anyMoodSelected ?
          <View style={styles.recordButtonView}>
            <Button
            color={'white'}
            title="Record Mood"
            onPress={() => moodHandler(moodChoices)}
            />
          </View>:
        null}
      </View>
    </View> 
  );
};
