import { StyleSheet, ScrollView, SafeAreaView, Button, Text, View } from 'react-native';

const styles = StyleSheet.create({
    header: {
        height: 150,
        width: '100%',
        padding: 40,
        backgroundColor:'#EAABFA',
        paddingTop: 80,
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

export default function HomeScreen( { navigation }) {
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.helloText}>hello, april </Text>
                <Text>     how are you feeling today? </Text>
            </View>
            <ScrollView>
                <SafeAreaView> 
                    <View style={styles.dataBox}>
                        
                    </View>
                    <View style={styles.dataBox}></View>
                    <View style={styles.dataBox}></View>
                    <View style={styles.dataBox}></View>
                    <View style={styles.dataBox}></View>
                </SafeAreaView>
                
            </ScrollView>
        </View>
    );
}