import React from "react";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, ScrollView, SafeAreaView} from "react-native";
// import { SafeAreaView } from "@react-navigation/native";
import Input from "../AuthComps/Input";
import { LinearGradient } from "expo-linear-gradient"
import actualCOLORS from "../AuthComps/actualColors";
import { Keyboard } from "react-native";
import COLORS from "../AuthComps/colors";
import Button from "../AuthComps/Button";

const Signup = ({ navigation }) => {
    const [inputs, setInputs] = React.useState({
        email: '',
        fullname: '',
        phone: '',
        password: '',
    });
    const [errors, setErrors] = React.useState({});
    const validate = () => {
        console.log("pressed");

        Keyboard.dismiss();
        let valid = true;
        if (!inputs.email) {
            handleError('Please input email', 'email');
            valid = false;
        }
        else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input valid email', 'email');
            valid = false;
        }
        if (!inputs.fullname) {
            handleError('Please input fullname', 'fullname');
            valid = false;
        }
        if (!inputs.phone) {
            handleError('Please input phone', 'phone');
            valid = false;
        }
        if (!inputs.password) {
            handleError('Please input password', 'password');
            valid = false;
        }
        else if (inputs.password.length < 5) {
            handleError('Min password length of 5', 'password');
            valid = false;
        }
        console.log(valid);

        if (valid) {
            console.log("before register");

            register();
        }
    };
    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    };

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }))
    }

    const register = async () => {
        setTimeout(() => {
            try {
                inputsJSON = JSON.stringify(inputs);
                console.log(inputs);
                AsyncStorage.setItem('userData', inputsJSON);
                navigation.replace('Login');
            } catch (error) {
                Alert.alert('Error', 'Something went wrong');
            }
        }, 2000)
    }

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgba(212, 132, 232, 0.89)', 'rgba(113, 189, 244, 0.93)']} style={{ flex: 1 }}>
            <SafeAreaView>
                <ScrollView
                    contentContainerStyle={{
                        paddingTop: 50,
                        paddingHorizontal: 20,
                        paddingBottom: 200
                    }}>
                    <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
                        Sign Up
                    </Text>
                    <Text style={{ color: COLORS.white, fontSize: 18, marginVertical: 10 }}>
                        Enter your details to signup.
                    </Text>
                    <View style={{ marginVertical: 20 }}>
                        <Input
                            placeholder="Enter your email address"
                            iconName="email-outline"
                            label='Email'
                            error={errors.email}
                            onFocus={() => {
                                handleError(null, "email")
                            }}
                            onChangeText={text => handleOnChange(text, "email")}
                        />
                        <Input
                            placeholder="Enter your full name"
                            iconName="account-outline"
                            label='Full name'
                            error={errors.fullname}
                            onFocus={() => {
                                handleError(null, "fullname")
                            }}
                            onChangeText={text => handleOnChange(text, "fullname")}
                        />
                        <Input
                            keyboardType="numeric"
                            placeholder="Enter your phone number"
                            iconName="phone-outline"
                            label='Phone number'
                            error={errors.phone}
                            onFocus={() => {
                                handleError(null, "phone")
                            }}
                            onChangeText={text => handleOnChange(text, "phone")}
                        />
                        <Input
                            placeholder="Enter a password"
                            iconName="lock-outline"
                            label='Password'
                            error={errors.password}
                            onFocus={() => {
                                handleError(null, "password")
                            }}
                            onChangeText={text => handleOnChange(text, "password")}
                            password
                        />
                        <Button title="Signup" onPress={validate} />
                        <Text style={{ color: COLORS.darkBlue, textAlign: "center", fontSize: 16, fontWeight: 'bold' }}>Already have an account? </Text>
                        <Text onPress={() => navigation.replace('Login')}
                            style={{ color: COLORS.blue, textAlign: "center", fontSize: 16, fontWeight: 'bold' }}>Login</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Signup;