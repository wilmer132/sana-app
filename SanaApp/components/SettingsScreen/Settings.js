import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-navigation";
import Input from "../AuthComps/Input";
import { LinearGradient } from "expo-linear-gradient"
// import actualCOLORS from "../../conts/actualColors";
import { Keyboard } from "react-native";
import COLORS from "../AuthComps/colors";
import Button from "../AuthComps/Button";

const Settings = ({ navigation }) => {
    const settingsOptions = [
        { title: "My Info", subTitle: "Setup your profile" },
        { title: "Log Out", onPress: () => {Logout()} }
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


    return (
        <ScrollView style={{ backgroundColor: COLORS.white }}>
            {settingsOptions.map(({ title, subTitle, onPress }, index) => (
                <TouchableOpacity key={title} onPress={onPress}>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            paddingBottom: 20,
                            paddingTop: 20,
                        }}>
                        <Text style={{ fontSize: 17 }}>{title}</Text>
                        {subTitle && (
                            <Text style={{ fontSize: 14, opacity: 0.5, paddingTop: 5 }}>
                                {subTitle}
                            </Text>
                        )}
                    </View>

                    <View style={{ height: 0.5, backgroundColor: COLORS.grey }} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}
export default Settings;