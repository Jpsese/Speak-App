import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';

const CurrentPlayer = ({ players, player, navigation }) => {

    const { category } = navigation.state.params;

    const onQuestionScreen = (questionNumber, card) => {
        navigation.navigate('Question', { questionNumber, card, category, player, players })
    }

    return (
        <React.Fragment>
            <View style={styles.player_name_container}>
                <Text style={styles.player_name}> {player.name}</Text>
            </View>
            <View style={styles.current_player}>

                {player.cards[0].score === 0 &&
                    <TouchableHighlight style={styles.left} onPress={() => onQuestionScreen(1, player.cards[0])}>
                        <Text style={styles.countText}> Question 1 </Text>
                    </TouchableHighlight>
                }

                {player.cards[1].score === 0 &&
                    <TouchableHighlight style={styles.center} onPress={() => onQuestionScreen(2, player.cards[1])}>
                        <Text style={styles.countText}> Question 2 </Text>
                    </TouchableHighlight>
                }

                {player.cards[2].score === 0 &&
                    <TouchableHighlight style={styles.right} onPress={() => onQuestionScreen(3, player.cards[2])}>
                        <Text style={styles.countText}> Question 3 </Text>
                    </TouchableHighlight>
                }
            </View>
        </React.Fragment>

    )
};

const styles = StyleSheet.create({
    current_player: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    player_name_container: {
        flex: 0.04,
        alignItems: 'center',
        paddingBottom: 5
    },
    player_name: {
        fontSize: 25,
        color: 'white'
    },
    left: {
        flex: 0.3,
        backgroundColor: 'grey',
        borderWidth: 5,
        height: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    center: {
        flex: 0.3,
        backgroundColor: 'beige',
        borderWidth: 5,
        height: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    right: {
        flex: 0.3,
        backgroundColor: 'pink',
        borderWidth: 5,
        height: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    countText: {
        color: "#000000",
        alignItems: "center",
        fontSize: 20
    }
});

export default CurrentPlayer;
