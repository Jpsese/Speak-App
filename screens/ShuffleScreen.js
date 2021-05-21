import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Title from "../components/Title";
import Colors from "../constants/Colors";
import * as firebase from "firebase";
import "@firebase/database";
import ApiKeys from "../constants/ApiKeys";
if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.firebaseConfig);
}

const ShuffleScreen = ({ navigation }) => {
    const playerNames = navigation.state.params.players;
    const { category } = navigation.state.params;

    const shuffleAndDistributeCards = async () => {
        let players = [];
        await playerNames.forEach(playerName => {
            let random10PtQuestionIndex = Math.floor(Math.random() * category.questions['10PTS'].length);
            let random15PtQuestionIndex = Math.floor(Math.random() * category.questions['15PTS'].length);
            let random20PtQuestionIndex = Math.floor(Math.random() * category.questions['20PTS'].length);

            let player = {
                name: playerName,   
                totalScore: 0,
                score: [0, 0, 0, 0],
                cards: [
                    {
                        question: category.questions['10PTS'].splice(random10PtQuestionIndex, 1)[0],
                        image: category.images['10PTS'].splice(random10PtQuestionIndex, 1)[0],
                        score: 0,
                        scoreToGain: 10
                    },
                    {
                        question: category.questions['15PTS'].splice(random15PtQuestionIndex, 1)[0],
                        image: category.images['15PTS'].splice(random15PtQuestionIndex, 1)[0],
                        score: 0,
                        scoreToGain: 15
                    }, {
                        question: category.questions['20PTS'].splice(random20PtQuestionIndex, 1)[0],
                        image: category.images['20PTS'].splice(random20PtQuestionIndex, 1)[0],
                        score: 0,
                        scoreToGain: 20
                    },
                ]
            }
            players.push(player);
        });
        goToChoosingPlayerScreen(players);
    }

    const goToChoosingPlayerScreen = (players) => {
        setTimeout(() => {
            navigation.navigate('ChoosingPlayer', { players, category: category.name });
        }, 3000)
    };

    useEffect(shuffleAndDistributeCards, []);

    return (
        <View style={styles.main}>
            <View style={styles.header} >
                <Title title="Shuffling and" />
                <Title title="distributing cards" />
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        </View>
    )
}


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

export default ShuffleScreen;
