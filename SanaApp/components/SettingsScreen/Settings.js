import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert, Modal, Text, Pressable, View, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-navigation";
import Input from "../AuthComps/Input";
import { LinearGradient } from "expo-linear-gradient"
import actualCOLORS from "../AuthComps/actualColors";
import { Keyboard } from "react-native";
import COLORS from "../AuthComps/colors";
import Button from "../AuthComps/Button";

const Settings = ({ navigation }) => {
    const settingsOptions = [
        { title: "My Info", subTitle: "Email, Full name, Phone number", onPress: () => { setShowMyInfoModal(true) } },
        { title: "Log Out", onPress: () => { Logout() } }
    ];

    const Logout = () => {
        console.log("pressed")
        setTimeout(async () => {
            let userData = await AsyncStorage.getItem('userData');
            userData = JSON.parse(userData);
            userData.loggedIn = false;
            console.log(userData);
            // userData[loggedIn] = false;
            AsyncStorage.setItem('userDate', JSON.stringify({...userData}), (err, result) => {
                console.log(result);
            });
            navigation.replace('Login');
        }, 1000);
    }
    
    [userEmail, setUserEmail] = useState('');
    [userFullname, setUserFullname] = useState('');
    [userPhone, setUserPhone] = useState('');
        const _GetInfo = async () => {
            let userData = await AsyncStorage.getItem('userData');
            userData = JSON.parse(userData);
            setUserEmail(userData.email)
            setUserFullname(userData.fullname)
            setUserPhone(userData.phone)
        }
    _GetInfo();

    const [inputs, setInputs] = React.useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    };

    const saveNewInfo = () => {
        setTimeout(() => {
            try {
                inputsJSON = JSON.stringify(inputs);
                console.log(inputs);
                AsyncStorage.setItem('userData', inputsJSON);
                navigation.replace('Login');
            } catch (error) {
                Alert.alert('Error', 'Something went wrong, could not save new user info. Please try again');
            }
        }, 1000)
        setUpdateInfoModal(!showUpdateInfoModal);
    }

    const [showMyInfoModal, setShowMyInfoModal] = useState(false);
    const [showUpdateInfoModal, setUpdateInfoModal] = useState(false);

    return (
        <ScrollView style={{ backgroundColor: COLORS.white }}>
            {/* Modal for my info */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showMyInfoModal}
                onRequestClose={() => {
                    Alert.alert('show info modal has been closed.');
                    setShowMyInfoModal(!showMyInfoModal);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Email: {userEmail}</Text>
                        <Text style={styles.modalText}>Fullname: {userFullname}</Text>
                        <Text style={styles.modalText}>Phone: {userPhone}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setShowMyInfoModal(!showMyInfoModal)
                            }>
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                        <Text style={styles.updateInfo} onPress={() => {setShowMyInfoModal(!showMyInfoModal); setUpdateInfoModal(true); } }>Update my info</Text>
                    </View>
                </View>
            </Modal>
            {/* End of my Info Modal */}

            {/* Modal for updating info */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showUpdateInfoModal}
                onRequestClose={() => {
                    Alert.alert('update info modal has been closed.');
                    setUpdateInfoModal(!showUpdateInfoModal);
                }}>
                    <View style={styles.centeredInfoView}>
                            <Text style={styles.TitleStyle}>Update Your Info</Text>
                            <View>
                                <Input
                                    placeholder="Enter your new email"
                                    placeholderTextColor='gray'
                                    iconName="email-outline"
                                    label='Email'
                                    onChangeText={text => handleOnChange(text, "email")}
                                />
                                <Input
                                    placeholder="Enter your updated name"
                                    placeholderTextColor='gray'
                                    iconName='account-outline'
                                    label='Name'
                                    onChangeText={text => handleOnChange(text, "phone")}
                                />
                                <Input
                                    placeholder="Enter your new phone number"
                                    placeholderTextColor='gray'
                                    iconName="phone-outline"
                                    label='Phone'
                                    onChangeText={text => handleOnChange(text, "phone")}
                                />
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={saveNewInfo}>
                                    <Text style={styles.textStyle}>Save</Text>
                                </Pressable>
                                <Text 
                                    style={{ 
                                        color: actualCOLORS.gradientPink,
                                        fontWeight: "bold",
                                        padding: 10,
                                        textAlign: "center"}
                                    }
                                    onPress={() => setUpdateInfoModal(!showUpdateInfoModal)}>
                                    Close
                                </Text>
                            </View>
                    </View>
            </Modal>
            {/* End of update info modal */}

            {settingsOptions.map(({ title, subTitle, onPress }, index) => (
                <TouchableOpacity key={title} onPress={onPress}>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            paddingBottom: 20,
                            paddingTop: 20,
                        }}>
                        <Text style={styles.TitleStyle}>{title}</Text>
                        {subTitle && (
                            <Text style={styles.SubtitleSytle}>
                                {subTitle}
                            </Text>
                        )}
                    </View>

                    <View style={styles.LineBetweenStyle} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    TitleStyle: {
        fontSize: 17
    },
    SubtitleSytle: {
        fontSize: 14,
        opacity: 0.5,
        paddingTop: 5
    },
    LineBetweenStyle: {
        height: 0.5,
        backgroundColor: COLORS.grey
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    centeredInfoView: {
        flex: 1,
        justifyContent: 'center',
        margin: 40
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    updateInfoModalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: actualCOLORS.gradientPink,
    },
    updateInfo: {
        fontWeight: "bold",
        paddingTop: 20,
        color: actualCOLORS.gradientPink,
        textDecorationLine: "underline"
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputStyle :{
        paddingHorizontal: 80,
        // width: 100
    }
})

export default Settings;
