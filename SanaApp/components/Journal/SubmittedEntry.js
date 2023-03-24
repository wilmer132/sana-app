import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Pressable, Image, StyleSheet, Alert } from 'react-native';
import { Card, Icon } from 'react-native-elements';

const SubmittedEntry = (props) => {
  // console.log(`Props: ${props}`)

  console.log('my journal rendered')

  if (props.route.params === undefined) {
    return (
      <View style={{backgroundColor:'#C1F8CF',display:'flex',alignItems:'center',height:'100%',justifyContent:'center',padding:25}}>
        <Text style={{textAlign:'center',marginBottom:20,fontSize:12}}>You haven't created any entries yet.</Text>
        <Text style={{textAlign:'center'}}>To create an entry, go to the Create tab.</Text>
      </View>
    )
  } 

  const {allEntries} = props.route.params
  const [savedEntries, setSavedEntries] = useState([allEntries])

  useEffect(() => {
    setSavedEntries(allEntries)
  },[allEntries])

  const submittedEntries = allEntries?.map(entry => 
    <View key={entry.id}>
      <Pressable 
        onLongPress={() => Alert.alert(
          'Delete',
          'Do you want to delete this entry?',
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: () => {
                console.log('ENTRY TO DELETE:', JSON.stringify(entry, null, 2))
                let remainingEntries = savedEntries.filter(item => item !== entry)
                console.log('REMAINING ENTRIES:', JSON.stringify(remainingEntries, null, 2))
                setSavedEntries(remainingEntries)
              }
            }
          ],
          {
            cancelable: true,
          }
        )
        }>
        <Card key={entry.id}>
          <Card.Title style={{fontWeight:'normal', fontSize:18,marginBottom:10}}>{entry.title}</Card.Title>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:5, paddingBottom:5}}>
            <Text style={{textAlign:'center',fontSize:10}}>{entry?.date}</Text>
            <Icon size={35} name={entry?.mood?.name} color={entry?.mood?.color} type='font-awesome-5' />
          </View>
          <Card.Divider />
          <Text style={{fontSize:12,fontStyle:'normal',paddingHorizontal:5}}>{entry.text}</Text>
          {entry.images &&
            entry.images.map(image => 
              <Image
                key={image}
                source={{ uri: image }} style={{ 
                  width: 325, 
                  height: 243.75,
                  alignSelf:'center',
                  marginTop:10
                }}
                resizeMode='cover' 
              />
            )
          }
        </Card>
      </Pressable>
    </View>
  );
  return (
      <ScrollView style={styles.container}>
        {submittedEntries}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#F3F4FB',
  }
})

export default SubmittedEntry;