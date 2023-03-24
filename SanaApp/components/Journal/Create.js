import React, { useState,  useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Alert, Modal, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';



// import * as SecureStore from 'expo-secure-store';

// Set up Date:
const dateObj = new Date();
const weekdayArr = ["Sun","Mon","Tues","Weds","Thurs","Fri","Sat"];
const weekday = weekdayArr[dateObj.getDay()];
const month = dateObj.getMonth();
const day = dateObj.getDate();
const year = dateObj.getFullYear();
const date = `${weekday}, ${month}/${day}/${year}`;

const JournalEntry = ({navigation}) => {
  console.log('journal entry rendered')

  // Modal State:
  const [moodModal, setMoodModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);

  // Journal Data State:
  // const [allEntries, setAllEntries] = useState([])
  const [newEntryData, setNewEntryData] = useState([]);
  
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [moodIcon, setMoodIcon] = useState({
    name: 'grin-alt',
    color: colors.mint
  });
  const [newEntryText, setNewEntryText] = useState('');
  const [newEntryImage, setNewEntryImage] = useState([]);
 
  function handleSubmitEntry() {

    let allEntries = newEntryData.concat({
      id: newEntryData ? newEntryData : '',
      date: date,
      title: newEntryTitle,
      mood: {
        name: moodIcon.name,
        color: moodIcon.color
      },
      text: newEntryText,
      images: newEntryImage
    });

    setNewEntryData(allEntries);
    navigation.navigate('My Journal', {allEntries});
    setNewEntryTitle('');
    setMoodIcon({name:'grin-alt',color:colors.mint});
    setNewEntryText('');
    setNewEntryImage([]);
    setPreviewModal(!previewModal);
    Alert.alert('Journal entry submitted'); 
  }

  // Code for images and camera access
  const pickGalleryImage = async () => {
    setImageModal(!imageModal);
  
    // Request gallery permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setNewEntryImage(prevJournalImages => [...prevJournalImages, result.assets[0].uri]);
        console.log(newEntryImage);
      }
    } else {
      // Display an alert or prompt the user to grant gallery permissions
      // For example:
      Alert.alert('Permission denied', 'You need to grant gallery permissions to use this feature');
    }
  };
  
  const pickCameraImage = async () => {
    setImageModal(!imageModal);
  
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
  
    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setNewEntryImage(prevJournalImages => [...prevJournalImages, result.assets[0].uri]);
        console.log(newEntryImage);
      }
    } else {
      // Display an alert or prompt the user to grant camera permissions
      // For example:
      Alert.alert('Permission denied', 'You need to grant camera permissions to use this feature');
    }
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['rgba(212, 132, 232, 0.89)', 'rgba(113, 189, 244, 0.93)']}
      style={styles.container}
    >
    <ScrollView style={styles.container}>
      <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <View>
          <Text style={{color:colors.midnightBlue,fontSize:30}}>{date}</Text>
    
        </View>
        <TouchableOpacity
          onPress={() => setMoodModal(true)}>
          <Icon 
            style={{padding:2,backgroundColor:'#F3F4FB',borderRadius:5}}
            size={40}
            name={moodIcon.name}
            color={moodIcon.color}
            type='font-awesome-5' />
        </TouchableOpacity>
      </View>
      <Modal
        animationType='fade'
        visible={moodModal} 
        transparent={true}
        backgroundOpacity={0.5}
        backgroundColor={'#000'}
        onRequestClose={() => setMoodModal(!moodModal)} >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{alignSelf:'flex-end'}}>
              <TouchableOpacity
                onPress={() => {
                  setMoodModal(!moodModal);
                  moodIcon.name !== 'grin-alt' ? setMoodIcon({name:'grin-alt',color:colors.mint}) : moodIcon.name;
                }} >
                <Icon
                  style={{margin:-5, padding:-10}}
                  name='close'
                  type='ionicons'
                  size={30}
                />
              </TouchableOpacity>
            </View>
            <Text style={{fontWeight:'bold',fontSize:20}}>Choose your mood:</Text>
            <View style={styles.moodsContainer}>
              <TouchableOpacity onPress={() => setMoodIcon({name:'sad-tear',color:colors.midnightBlue})}><Icon size={45} name='sad-tear' type='font-awesome-5' color='#3E4985' padding={5} borderRadius={50} /></TouchableOpacity>
              <TouchableOpacity onPress={() => setMoodIcon({name:'frown',color:colors.cobaltBlue})}><Icon size={45} name='frown' type='font-awesome-5' color='#488FB1' padding={5} borderRadius={50} /></TouchableOpacity>
              <TouchableOpacity onPress={() => setMoodIcon({name:'meh',color:colors.turquoise})}><Icon size={45} name='meh' type='font-awesome-5' color='#4FD3C4' padding={5} borderRadius={50} /></TouchableOpacity>
              <TouchableOpacity onPress={() => setMoodIcon({name:'grin-beam',color:colors.yellow})}><Icon size={45} name='grin-beam' type='font-awesome-5' color='#FFD32D' padding={5} borderRadius={50} /></TouchableOpacity>
              <TouchableOpacity onPress={() => setMoodIcon({name:'grin-hearts',color:colors.pink})}><Icon size={45} name='grin-hearts' type='font-awesome-5' color='#FF449F' padding={5} borderRadius={50} /></TouchableOpacity>
            </View>
            <Button
              title='Select'
              containerStyle={{width:'30%',borderRadius:30}}
              buttonStyle={{backgroundColor:'#5D5FEE',borderRadius:8, justifyContent: 'center', alignItems: 'center', marginVertical: 20}}
              onPress={() => setMoodModal(!moodModal)}
              />
          </View>
        </View>
      </Modal>
      <View style={styles.text}>
        <Icon 
          style={{marginLeft:2.5, marginRight:5}} 
          color={colors.midnightBlue}
          name='pencil' 
          type='font-awesome' />
        <Text style={[{color:colors.midnightBlue}]}>Title:</Text>
        <TextInput
          style={styles.title}
          onChangeText={title => setNewEntryTitle(title)}
          // onChangeText={title => }
          defaultValue={newEntryTitle}
          value={newEntryTitle}
          placeholder='Your Title'
          autoCapitalize='words'
        />
      </View>
      <View style={{margin:10}}>
        <TextInput 
          style={styles.textarea}
          onChangeText={text => setNewEntryText(text)}
          defaultValue={newEntryText}
          value={newEntryText}
          multiline
          numberOfLines={10}
          allowFontScaling
          autoCapitalize='sentences'
          textAlignVertical= 'top'
          placeholder='What is on your mind?'
        /> 
      </View>
      <View style={{marginBottom:5}}>
        {newEntryImage && 
          newEntryImage.map(image => 
            <Image 
              key={image}
              source={{ uri: image }}
              style={{ 
                width: 360, 
                height: 270,
                marginBottom: 10,
                alignSelf:'center'
              }}
              resizeMode='cover' 
            />  
          )
        }
      </View>
      <Button
        title="Upload Image"
        icon={{
          name: 'camera',
          type: 'ionicons',
          size: 30,
          color: '#FFF8F3',
          paddingRight: 5
        }}
        loading={false}
        loadingProps={{ size: 'small', color: 'white' }}
        buttonStyle={{height: 55, width: '100%', backgroundColor:'#5D5FEE',borderRadius:8, justifyContent: 'center', alignItems: 'center', marginVertical: 20}}
        titleStyle={{color: '#fff', fontWeight: 'bold', fontSize: 18, letterSpacing:0.5}}
        containerStyle={{
          height: 80,
          width: '100%',
        }}
        onPress={() => setImageModal(true)}
      />
      <Modal
        transparent={true}
        animationType='fade'
        visible={imageModal}
        onRequestClose={() => {
          setImageModal(!imageModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{alignSelf:'flex-end'}}>
              <TouchableOpacity
                onPress={() => {
                  setImageModal(!imageModal);
                }} >
                <Icon
                  style={{margin:0,padding:-10}}
                  name='close'
                  type='ionicons'
                  size={30}
                />
              </TouchableOpacity>
            </View>
            <View style={{margin:15,paddingBottom:10,display:'flex',flexDirection:'row',width:'85%',justifyContent:'space-between'}}>
              <Button
                icon={{
                  name:'camera',
                  type:'feather',
                  size:100,
                  color:'white'
                }}
                containerStyle={{
                  height: 130,
                  width: 130,
                  
                }}
                buttonStyle={{
                  color:colors.midnightBlue,
                }}
                onPress={pickCameraImage}
                style={{paddingLeft: 1}}
              />
              <Button
                icon={{
                  name:'image',
                  type:'feather',
                  size:100,
                  color:'white'
                }}
                containerStyle={{
                  height: 130,
                  width: 130,
                  
                }}
                buttonStyle={{
                  color:colors.midnightBlue,
                }}
                onPress={pickGalleryImage}
              />
            </View>
          </View>  
        </View>
      </Modal>
      <Button
        title="Log Entry"
        icon={{
          name: 'check',
          type: 'ionicons',
          size: 30,
          color: '#FFF8F3',
        }}
        loading={false}
        loadingProps={{size:'small',color:'white'}}
        buttonStyle={{height: 55, width: '100%', backgroundColor:'#5D5FEE',borderRadius:8, justifyContent: 'center', alignItems: 'center', marginVertical: 20}}
        titleStyle={{color: '#fff', fontWeight: 'bold', fontSize: 18, letterSpacing:0.5}}
        containerStyle={{
          height: 80,
          width: '100%',
          marginBottom: 30
        }}
        onPress={() => setPreviewModal(true)}
      />
      <Modal
        animationType='fade'
        transparent={true}
        visible={previewModal}
        onRequestClose={() => {
          setPreviewModal(!previewModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{alignSelf:'flex-end'}}>
              <TouchableOpacity
                onPress={() => {
                  setPreviewModal(!previewModal);
                }} >
                <Icon
                  style={{margin:-5, padding:-10}}
                  name='close'
                  type='ionicons'
                  size={30} />
              </TouchableOpacity>
            </View>
            <Text style={{color:'#000',fontSize:20,letterSpacing:1,marginBottom:10}}>Your Journal Entry</Text>
            <ScrollView style={{width:'100%'}} >
              <Card>
                <Card.Title style={{fontWeight:'normal',fontSize:18,marginBottom:10}}>{newEntryTitle}</Card.Title>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:5}}>
                  <Text style={{textAlign:'center',fontSize:10, fontWeight: 'bold'}}>{date}</Text>
                  <Icon size={35} name={moodIcon.name} color={moodIcon.color} type='font-awesome-5' />
                </View>
                <Card.Divider />
                <Text style={{fontSize:12}}>{newEntryText}</Text>
                {newEntryImage && 
                  newEntryImage.map(image => 
                    <Image
                      key={image}
                      source={{ uri: image }} 
                      style={{ 
                        width: 260, 
                        height: 195,
                        marginVertical: 10,
                        alignSelf:'center'
                      }}
                      resizeMode='cover' 
                    />
                  )
                }
              </Card>
            </ScrollView>
            <Button
              className='previewModalBtn'
              title='Submit'
              loading={false}
              loadingProps={{size:'small',color:'white'}}
              buttonStyle={{
                backgroundColor:'#5D5FEE',
                borderRadius:5,
              }}
              containerStyle={{
                width:200,
                marginHorizontal:50,
                marginVertical:20,
              }}
              onPress={() => handleSubmitEntry()}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
    </LinearGradient>
  )
}

const colors = {
  pink: '#FF449F',
  yellow: '#FFD32D',
  mint: '#C1F8CF',
  turquoise: '#4FD3C4',
  midnightBlue: '#3E4985',
  cobaltBlue: '#488FB1',
}

const styles = StyleSheet.create({
  container: {
    padding:40,
  },
  text: {
    marginTop: 30, 
    marginRight:'auto', 
    display:'flex', 
    flexDirection:'row',
    alignItems:'center'
  },
  title: {
    marginLeft:10,
    backgroundColor:'#F3F4FB',
    width:'72%',
    height:46,
    paddingHorizontal:20,
    borderRadius: 8,
    color:colors.midnightBlue,
    fontSize:16,
    borderWidth: 0.5,
  },
  textarea: {
    padding:10,
    alignItems:'flex-start',
    marginTop:10,
    backgroundColor: '#F3F4FB',
    flexDirection: 'row',
    borderWidth: 0.5,
    marginHorizontal:-50,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    height: 90,
  },
  centeredView: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:56,
    marginBottom:79,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width:'92%',
    maxHeight:'75%',
    margin:15,
    backgroundColor:'#FFFF',
    shadowColor:'#3E4985',
    shadowRadius:10,
    shadowOffset:10,
    borderRadius:10,
    padding:20,
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset: {
      width:0,
      height:2
    },
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:5
  },
  moodsContainer: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    width:'100%',
    paddingVertical:30
  }
});

export default JournalEntry;