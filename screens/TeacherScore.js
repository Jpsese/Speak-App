import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Button from "../components/Button";
import Title from "../components/Title";
import Colors from "../constants/Colors";

const TeacherScore = ({ navigation }) => {
    const { player, card, players } = navigation.state.params;
    const goToNextScreenHandler = (score) => {
        console.log(score);
        player.score[3] = score;
        player.totalScore = player.totalScore + (player.score[0] * 0.10) + (player.score[1] * 0.20) + (player.score[2] * 0.30) + (player.score[3] * 0.40);

        navigation.navigate('ShowScore', { players, card, player });
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Title title="Teacher's Score" />
                <Text style={styles.subTitle}>Ask your teacher to give you a score based on your performance</Text>
            </View>
            <View style={styles.footerContainer}>
                <Button style={styles.button} content="20 pts" buttonPress={() => goToNextScreenHandler(20)} />
                <Button style={styles.button} content="15 pts" buttonPress={() => goToNextScreenHandler(15)} />
                <Button style={styles.button} content="10 pts" buttonPress={() => goToNextScreenHandler(10)} />
                <Button style={styles.button} content="5 pts" buttonPress={() => goToNextScreenHandler(5)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.secondary
    },
    headerContainer: {
        width: "100%",
        height: "30%",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "3%"
    },
    footerContainer: {
        width: "100%",
        height: "70%",
        alignItems: "center",
        justifyContent: "space-around"
    },
    subTitle: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "open-sans",
        color: Colors.primary
    },
    button: {
        height: 100,
        width: Dimensions.get("window").width / 2,
    }

})

export default TeacherScore;