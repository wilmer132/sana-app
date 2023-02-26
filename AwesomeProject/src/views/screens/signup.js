import React from "react";
<<<<<<< Updated upstream
=======
import { Alert } from "react-native";
>>>>>>> Stashed changes
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-navigation";
import Input from "../components/input";
import { LinearGradient } from "expo-linear-gradient"
import actualCOLORS from "../../conts/actualColors";
import { Keyboard } from "react-native";
import COLORS from "../../conts/colors";
import Button from "../components/button";

const Signup = ({ navigation }) => {
    const [inputs, setInputs] = React.useState({
        email: '',
        fullname: '',
        phone: '',
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
        if (!inputs.fullname) {
            handleError('Please input fullname', 'fullname');

        }
        if (!inputs.phone) {
            handleError('Please input phone', 'phone');
        }
        if (!inputs.password) {
            handleError('Please input password', 'password');
        }
        else if (inputs.password.length < 5) {
            handleError('Min password length of 5', 'password');
        }

        if (valid) {
            register();
        }
    };
    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    };

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }))
    }

    const register = () => {
        setTimeout(() => {
            try {
                setLoading(false);
                AsyncStorage.setItem('userData', JSON.stringify(inputs));
<<<<<<< Updated upstream
                navigation.navigate('LoginScreen');
=======
                navigation.navigate('Login');
>>>>>>> Stashed changes
            } catch (error) {
                Alert.alert('Error', 'Something went wrong');
            }
        }, 3000)
    }

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgba(212, 132, 232, 0.89)', 'rgba(113, 189, 244, 0.93)']} style={{ flex: 1 }}>
            <SafeAreaView>
                <ScrollView
                    contentContainerStyle={{
                        paddingTop: 50,
<<<<<<< Updated upstream
                        paddingHorizontal: 20
=======
                        paddingHorizontal: 20,
                        paddingBottom: 200
>>>>>>> Stashed changes
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
                            onFocus={() => {
                                handleError(null, "phone")
                            }}
                            onChangeText={text => handleOnChange(text, "phone")}
                        />
                        <Input
                            placeholder="Enter a password"
                            iconName="lock-outline"
                            label='Password'
                            onFocus={() => {
                                handleError(null, "password")
                            }}
                            onChangeText={text => handleOnChange(text, "password")}
                            password
                        />
                        <Button title="Signup" onPress={validate} />
<<<<<<< Updated upstream
                        <Text onPress={() => navigation.navigate('LoginScreen')}
                            style={{ color: COLORS.black, textAlign: "center", fontSize: 16, fontWeight: 'bold' }}>Already have an account? Login</Text>
=======
                        <Text style={{ color: COLORS.darkBlue, textAlign: "center", fontSize: 16, fontWeight: 'bold' }}>Already have an account? </Text>
                        <Text onPress={() => navigation.replace('Login')}
                            style={{ color: COLORS.blue, textAlign: "center", fontSize: 16, fontWeight: 'bold' }}>Login</Text>
>>>>>>> Stashed changes
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Signup;