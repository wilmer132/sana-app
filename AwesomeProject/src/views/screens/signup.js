import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-navigation";
import Input from "../components/input";
import {LinearGradient} from "expo-linear-gradient"
import actualCOLORS from "../../conts/actualColors";
import COLORS from "../../conts/colors";
import Button from "../components/button";

export default function Signup() {
    return (
        <LinearGradient start={{x: 0, y:0}} end={{x:1, y:0}} colors={['rgba(212, 132, 232, 0.89)', 'rgba(113, 189, 244, 0.93)']} style={{flex: 1}}>
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: 50,
                    paddingHorizontal: 20,
                }}>
                <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
                    Signup
                </Text>
                <Text style={{ color: COLORS.white, fontSize: 18, marginVertical: 10 }}>
                    Enter your details to signup.
                </Text>
                <View style={{ marginVertical: 20 }}>
                    <Input
                        placeholder="Enter your email address"
                        iconName="email-outline"
                        label='Email'
                    />
                    <Input
                        placeholder="Enter your full name"
                        iconName="account-outline"
                        label='Full name'
                    />
                    <Input
                        placeholder="Enter your phone number"
                        iconName="phone-outline"
                        label='Phone number'
                    />
                    <Input
                        placeholder="Enter a password"
                        iconName="lock-outline"
                        label='Password'
                        password
                    />
                    <Button title="Signup" />
                    <Text onPress={() => navigation.navigate('LoginScreen')}
                    style={{ color: COLORS.black, textAlign: "center", fontSize: 16, fontWeight: 'bold' }}>Already have an account? Login</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 60
    }
})