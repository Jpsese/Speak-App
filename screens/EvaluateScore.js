import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import * as FileSystem from 'expo-file-system';

const EvaluateScore = () => {
    const [evaluating, setEvaluating] = useState(false);



    return (
        <View style={styles.main}>
            <View style={styles.header} >
                <Title title="Evaluating Answer" />
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.secondary
    },
    header: {
        width: "100%",
        alignItems: "center",
    },
});


export default EvaluateScore;