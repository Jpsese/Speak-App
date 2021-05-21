import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';
import Title from '../components/Title';
import { TopPlayer, LeftPlayer, RightPlayer, CurrentPlayer } from '../components/GameBoard';

const GameBoard = ({ navigation }) => {
    const { players } = navigation.state.params;
    return (
        <View style={styles.main}>

            <TopPlayer player={players[2]} />

            <View style={styles.other_players}>

                <LeftPlayer player={players[1]} />

                <View style={{ flex: 0.4, top: 200 }} >
                    <Title title={`${players[0].name}'s Turn`} />
                    <Text style={{ fontSize: 20, fontFamily: "open-sans-bold", color: Colors.primary }}>Choose one of your cards</Text>
                </View>

                <RightPlayer player={players[3]} />

            </View>

            <CurrentPlayer players={players} player={players[0]} navigation={navigation} />

        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.secondary
    },
    other_players: {
        flex: 0.8,
        flexDirection: "row",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    button: {
        alignItems: "center",
        padding: 10
    },
    countContainer: {
        alignItems: "center",
        padding: 10
    },
    countText: {
        color: "#000000",
        alignItems: "center",
        fontSize: 20
    }

});

export default GameBoard;
