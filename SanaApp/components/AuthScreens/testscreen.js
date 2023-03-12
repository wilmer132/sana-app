import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function test() {
    return (
        <View style={styles.container}>
            <Text>This is the test screen.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 60
    }
})