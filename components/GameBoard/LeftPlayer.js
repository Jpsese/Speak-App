import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const LeftPlayer = ({ player }) => (
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
            <Text style={styles.player_name}>{player.name}</Text>
        </View>
    </React.Fragment>

)

const styles = StyleSheet.create({
    player: {
        flex: 0.2,
        flexDirection: 'column',
        alignItems: 'baseline',
        justifyContent: 'center',
        top: 100
    },
    player_name_container: {
        flex: 0.2,
        top: 100,
    },
    player_name: {
        width: 200,
        top: 240,
        right: 70,
        color: 'white',
        transform: [{ rotate: '90deg' }],
        fontSize: 25,
    },
    left: {
        flex: 0.2,
        backgroundColor: 'white',
        borderWidth: 5,
        right: 50,
        padding: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        transform: [
            {
                rotate: '90deg'
            }
        ]
    },
    center: {
        flex: 0.2,
        backgroundColor: 'white',
        borderWidth: 5,
        bottom: 100,
        right: 50,
        padding: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        transform: [
            {
                rotate: '90deg'
            }
        ]
    },
    right: {
        flex: 0.2,
        backgroundColor: 'white',
        borderWidth: 5,
        bottom: 200,
        right: 50,
        padding: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        transform: [
            {
                rotate: '90deg'
            }
        ]
    },

});

export default LeftPlayer;
