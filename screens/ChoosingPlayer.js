import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import Title from "../components/Title";
import Colors from "../constants/Colors";

const ChoosingPlayer = ({ navigation }) => {
    const { players, category } = navigation.state.params;
    const [player, setPlayer] = useState('');
    const [isChoosingPlayer, setIsChoosingPlayer] = useState(true);

    const onShufflePlayers = () => {
        let shuffledPlayers = [];

        for (let i = 0; i < 4; i++) {
            shuffledPlayers.push(players.splice(Math.floor(Math.random() * players.length), 1)[0])
        }

        setTimeout(() => {
            setPlayer(shuffledPlayers[0].name);
            setIsChoosingPlayer(false);
            goToGameBoard(shuffledPlayers);
        }, 3000);
    }

    const goToGameBoard = (shuffledPlayers) => {
        setTimeout(() => {
            navigation.navigate("GameBoard", { players: shuffledPlayers, category })
        }, 2000)
    }

    useEffect(onShufflePlayers, []);

    return (
        <React.Fragment>
            <View style={styles.main}>
                <View style={styles.header} >
                    {isChoosingPlayer ?
                        <React.Fragment>
                            <Title title="Choosing First Player: " />
                            <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />

                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Title title="First Player:" />
                            <Text style={styles.player} > {player} </Text>
                        </React.Fragment>
                    }
                </View>
            </View>
            <View style={styles.subheader}>
                {isChoosingPlayer ?
                    <Title title={"Will it be you?"} /> :
                    <Text style={{ fontSize: 20, fontFamily: "open-sans-bold", color: Colors.primary }}> Turns will proceed clockwise </Text>}
            </View>
        </React.Fragment>

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
    loader: {
        top: 20
    },
    player: {
        fontFamily: "open-sans-bold",
        fontSize: 70,
        color: Colors.primary,
    },
    subheader: {
        alignItems: "center",
        justifyContent: 'flex-end',
        backgroundColor: Colors.secondary
    }
});

export default ChoosingPlayer;
