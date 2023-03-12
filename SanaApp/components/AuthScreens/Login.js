// import React from "react";
// import { Alert, Keyboard, StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from "@react-navigation/native";
// import Input from "../AuthComps/Input";
// import LinearGradient from "expo-linear-gradient";
// import COLORS from "../AuthComps/colors";
// import Button from "../AuthComps/Button";
// import actualCOLORS from "../AuthComps/actualColors.js";

import React from "react";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-navigation";
import Input from "../AuthComps/Input";
import { LinearGradient } from "expo-linear-gradient"
// import actualCOLORS from "../../conts/actualColors";
import { Keyboard } from "react-native";
import COLORS from "../AuthComps/colors";
import Button from "../AuthComps/Button";;


const Login = ({ navigation }) => {

    const tokenlogin = async() => {
        const value = await AsyncStorage.getItem('userData')
        if (value !== null) {
            navigation.navigate('HomeScreen')
            console.log('connected')
        }else {
            console.log('cant connect')
        }
    }
    
    const [inputs, setInputs] = React.useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = React.useState({});
    const validate = () => {
        Keyboard.dismiss();
        const valid = true;
        if (!inputs.email) {
            handleError('Please input email', 'email');
            let valid = false;
        }
        else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input valid email', 'email');
        }
        if (!inputs.password) {
            handleError('Please input correct password', 'password');
        }
        else if (inputs.password.length < 5) {
            handleError('Min password length of 5', 'password');
        }

        if (valid) {
            login();
        }
    };
    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    };

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }))
    }

    const login = () => {
        setTimeout(async () => {
          let userData = await AsyncStorage.getItem('userData');
          if (userData !== null) {
            userData = JSON.parse(userData);
            if (inputs.email == userData.email && inputs.password == userData.password) {
              navigation.replace('HomeScreen');
              AsyncStorage.setItem('userData', JSON.stringify({...userData, loggedIn: true}),);
            } else {
              Alert.alert('Error', 'Invalid Details: Check your email or password and try again');
            }
          } else {
            Alert.alert('Error', 'User does not exist');
          }
        }, 1000);
      };

    tokenlogin()
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
                        Login
                    </Text>
                    <Text style={{ color: COLORS.white, fontSize: 18, marginVertical: 10 }}>
                        Enter your details to login.
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
                            placeholder="Enter your password"
                            iconName="lock-outline"
                            label='Password'
                            onFocus={() => {
                                handleError(null, "password")
                            }}
                            onChangeText={text => handleOnChange(text, "password")}
                            password
                        />
                        <Button title="Login" onPress={validate} />
                        <Text onPress={() => navigation.replace('Signup')}
                            style={{ color: COLORS.blue, textAlign: "center", fontSize: 16, fontWeight: 'bold' }}>Create an account
                        </Text>
                        <Text onPress={() => navigation.navigate('ForgotPassword')}
                            style={{ color: COLORS.blue, textAlign: "center", fontSize: 16, fontWeight: 'bold' }}>Forgot your password?
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Login;