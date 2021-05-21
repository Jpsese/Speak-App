import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Title from "../components/Title";
import Colors from "../constants/Colors";
import * as _ from "lodash"
const WinnerScreen = ({ navigation }) => {
    const { players } = navigation.state.params;
    const [sortedPlayer, setSortedPlayer] = useState([]);
    useEffect(() => {
        // setSortedPlayer(_.sortBy(players, o => o.totalScore));
    }, [])
    const goToCategoriesHandler = () => {
        navigation.navigate('Home');
    }
    return (
        <View style={styles.mainContainer}>
            {/* <View style={styles.headerContainer}>
                <Title title="Winner!" />
                <Text style={styles.winnerName}>JOHN</Text>
            </View> */}
            <View style={styles.scoreContainer}>
                <View style={styles.scoreBorder}>
                    <View style={styles.scoreHeaderContainer}>
                        <Title title="Final Score" />
                    </View>
                    <View style={styles.scoreBodyContainer}>
                        <View style={styles.scoreNameContainer}>
                            <Text style={styles.scoreName}>{players[0].name}</Text>
                            <Text style={styles.scoreName}>{players[1].name}</Text>
                            <Text style={styles.scoreName}>{players[2].name}</Text>
                            <Text style={styles.scoreName}>{players[3].name}</Text>
                        </View>
                        <View style={styles.scoreValueContainer}>
                            <Text style={styles.scoreValue}>{players[0].totalScore}</Text>
                            <Text style={styles.scoreValue}>{players[1].totalScore}</Text>
                            <Text style={styles.scoreValue}>{players[2].totalScore}</Text>
                            <Text style={styles.scoreValue}>{players[3].totalScore}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.footerContainer}>
                <Button content="End Game" buttonPress={goToCategoriesHandler} />
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
        height: "55%",
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    scoreBorder: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        borderWidth: 2,
        borderColor: "white",
    },
    scoreHeaderContainer: {
        width: "100%",
        height: "15%",
        borderBottomWidth: 2,
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    scoreBodyContainer: {
        width: "100%",
        height: "90%",
        flexDirection: "row",
        padding: "5%"
    },
    scoreNameContainer: {
        width: "70%",
        height: "100%",
        justifyContent: "space-around"
    },
    scoreValueContainer: {
        width: "30%",
        height: "100%",
        justifyContent: "space-around",
    },
    footerContainer: {
        width: "100%",
        height: "10%",
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
        textAlign: "right",
        fontFamily: "open-sans",
        color: Colors.primary
    },
    winnerName: {
        fontSize: 120,
        color: Colors.primary,
        fontFamily: "open-sans"
    }


})

export default WinnerScreen;