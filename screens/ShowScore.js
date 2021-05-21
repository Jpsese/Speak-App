import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Button from "../components/Button";
import Title from "../components/Title";
import Colors from "../constants/Colors";

const ShowScore = ({ navigation }) => {
    const { player, card, players } = navigation.state.params;
    const totScore = (player.score[0] * 0.10) + (player.score[1] * 0.20) + (player.score[2] * 0.30) + (player.score[3] * 0.40);
    const checkIfAllCardsAreDone = () => {
        let cards = []
        players.forEach(player => {
            let tempCards = cards;
            cards = tempCards.concat(player.cards);
        });

        return !(cards.filter(card => card.score === 0).length > 0);
    }

    const goToGameBoard = () => {
        player.cards.find(item => item.question === card.question).score = (player.score[0] * 0.10) + (player.score[1] * 0.20) + (player.score[2] * 0.30) + (player.score[3] * 0.40);
        players.splice(0, 1, player)
        let oldPlayer = players.shift();
        players.push(oldPlayer);
        if (checkIfAllCardsAreDone()) {
            navigation.navigate('WinnerScreen', { players });
        } else {
            navigation.navigate('GameBoard', { players })
        }
    }


    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.score}>{totScore}</Text>
                <Title title="points for this round!" />
            </View>
            <View style={styles.scoreContainer}>
                <View style={styles.scoreNameContainer}>
                    <Text style={styles.scoreName}>Word Count</Text>
                    <Text style={styles.scoreName}>Grammar</Text>
                    <Text style={styles.scoreName}>Teacher's Input</Text>
                    <Text style={styles.scoreName}>Difficulty Level</Text>
                </View>
                <View style={styles.scoreValueContainer}>
                    <Text style={styles.scoreValue}>{player.score[2]} pts</Text>
                    <Text style={styles.scoreValue}>{player.score[1]} pts</Text>
                    <Text style={styles.scoreValue}>{player.score[3]} pts</Text>
                    <Text style={styles.scoreValue}>{player.score[0]} pts</Text>
                </View>
            </View>
            <View style={styles.footerContainer}>
                <Button content="Next Player" buttonPress={goToGameBoard} />
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
        height: "35%",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    scoreContainer: {
        width: "100%",
        height: "50%",
        paddingLeft: "5%",
        paddingRight: "5%",
        flexDirection: "row"
    },
    scoreNameContainer: {
        width: "70%",
        height: "100%",
        justifyContent: "space-around"
    },
    scoreValueContainer: {
        width: "30%",
        height: "100%",
        justifyContent: "space-around"
    },
    footerContainer: {
        width: "100%",
        height: "15%",
        alignItems: "center"
    },
    scoreName: {
        fontSize: 25,
        textAlign: "left",
        fontFamily: "open-sans",
        color: Colors.primary
    },
    scoreValue: {
        fontSize: 25,
        textAlign: "center",
        fontFamily: "open-sans",
        color: Colors.primary
    },
    score: {
        fontSize: 120,
        color: Colors.primary,
        fontFamily: "open-sans"
    }


})

export default ShowScore;
