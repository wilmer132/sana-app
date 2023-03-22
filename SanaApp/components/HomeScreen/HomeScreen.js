import { StyleSheet, ScrollView, SafeAreaView, Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ContributionGraph } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const _GetInfo = async () => {
    let userData = await AsyncStorage.getItem('userData');
    userData = JSON.parse(userData);
    console.log("on home screen")
    console.log(userData);
    if (!userData.loggedIn) {
        navigation.replace('Login');
    }
}
_GetInfo();

const styles = StyleSheet.create({
    header: {
        height: 120,
        width: '100%',
        padding: 40,
        backgroundColor:'#EAABFA',
        paddingTop: 30,
        borderColor: 'black',
        borderradius: 3,
    },
    container: {
        height: '88%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-left',
        borderColor: 'black',
      },
      helloText: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 5, 
      },
      questionText: {

      },
    infoBox: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    dataBox: {
        height: 250,
        width: 400, 
        margin: 10,
        backgroundColor: '#F4F1E8',
        borderColor: '#4D9CD6',
        borderWidth: 5, 
        borderRadius: 10,
    }
});

const chartConfig = {
    backgroundGradientFrom: 'rgba(212, 132, 232, 0.89)',
    backgroundGradientFromOpacity: 100,
    backgroundGradientTo: 'rgba(113, 189, 244, 0.93)',
    backgroundGradientToOpacity: 100,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

const commitsData = [
    { date: "2017-01-02", count: 1 },
    { date: "2017-01-03", count: 2 },
    { date: "2017-01-04", count: 3 },
    { date: "2017-01-05", count: 4 },
    { date: "2017-01-06", count: 5 },
    { date: "2017-01-30", count: 2 },
    { date: "2017-01-31", count: 3 },
    { date: "2017-03-01", count: 2 },
    { date: "2017-04-02", count: 4 },
    { date: "2017-03-05", count: 2 },
    { date: "2017-02-30", count: 4 }
  ];

export default function HomeScreen( { navigation }) {
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.helloText}>hello, april </Text>
                <Text>     how are you feeling today? </Text>
            </View>
            <ScrollView>
                <SafeAreaView> 
                    <ContributionGraph
                        values={commitsData}
                        endDate={new Date("2017-04-01")}
                        numDays={105}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                    />
                </SafeAreaView>
                
            </ScrollView>
        </View>
    );
}