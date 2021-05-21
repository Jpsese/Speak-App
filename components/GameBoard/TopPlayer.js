import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const TopPlayer = ({ player }) => (
    <React.Fragment>
        <View style={styles.player}>
            {player.cards[0].score === 0 &&
                <View style={styles.left} />
            }

            {player.cards[1].score === 0 &&
                <View style={styles.center} />
            }

            {player.cards[2].score === 0 &&
                <View style={styles.right} />
            }
        </View>
        <View style={styles.player_name_container}>
            <Text style={styles.player_name}> {player.name}</Text>
        </View>
    </React.Fragment>

);

const styles = StyleSheet.create({
    player: {
        flex: 0.18,
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
        color: 'white',
        transform: [
            { rotate: '180deg' }
        ]
    },
    left: {
        flex: 0.2,
        backgroundColor: 'white',
        borderWidth: 5,
        padding: 50,
        left: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        transform: [
            { rotate: '180deg' }
        ]
    },
    center: {
        flex: 0.2,
        backgroundColor: 'white',
        borderWidth: 5,
        padding: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        transform: [
            { rotate: '180deg' }
        ]

    },
    right: {
        flex: 0.2,
        backgroundColor: 'white',
        borderWidth: 5,
        right: 50,
        padding: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        transform: [
            { rotate: '180deg' }
        ]
    }
});


export default TopPlayer;
