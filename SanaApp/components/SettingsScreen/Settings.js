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
        { title: "My Info", subTitle: "Email, Full name, Phone number, ...", onPress: () => { setShowMyInfoModal(true) } },
        { title: "Log Out", onPress: () => { Logout() } }
    ];

    const Logout = () => {
        console.log("pressed")
        setTimeout(async () => {
            let userData = await AsyncStorage.getItem('userData');
            userData = JSON.parse(userData);
            AsyncStorage.removeItem('userData', (err, result) => {
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



    const [showMyInfoModal, setShowMyInfoModal] = useState(false);

    return (
        <ScrollView style={{ backgroundColor: COLORS.white }}>
            {/* Modal for my info */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showMyInfoModal}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
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
                    </View>
                </View>
            </Modal>
            {/* End of my Info Modal */}

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
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default Settings;
