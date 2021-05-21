import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import Title from '../components/Title';


const Question = ({ navigation }) => {

    const { questionNumber, card, player, players, category } = navigation.state.params;
    const [count, setCount] = useState(12);
    const [isFetchingImage, setIsFetchingImage] = useState(true);

    console.log(card);

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setCount(count => count - 1);
        }, 1000)

        if (count === 0) {
            clearInterval(interval)
            navigation.navigate('AnswerQuestion', { players, card, player })
        }
        return () => clearInterval(interval);
    }, [count])

    return (
        <View style={styles.main}>
            <View style={styles.questionNumber}>
                <Title title={`Question ${questionNumber}`} />
            </View>
            <View style={styles.category}>
                <Title title={category} />
            </View>
            <View style={styles.imageContainer}>
                <ActivityIndicator size="large" color="#34ebd8" animating={isFetchingImage}
                    style={styles.imageLoader}
                />
                <Image
                    onLoad={() => setIsFetchingImage(false)}
                    source={{
                        uri: card.image
                    }} style={styles.image} />
            </View>
            <View style={styles.question}>
                <Title title={card.question} />
            </View>
            <View style={styles.timer}>
                <View style={styles.counterCircle}>
                    <Text style={styles.count}>{count}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.secondary
    },
    questionNumber: {
        flex: 0.05,
        alignItems: 'center',
        paddingTop: 50,
    },
    imageContainer: {
        flex: 0.3
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageLoader: {
        top: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    category: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    question: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        flex: 0.2,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    counterCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: "#34ebd8",
        alignItems: 'center',
        justifyContent: 'center',
    },
    count: {
        fontSize: 45,
        color: "#34ebd8",
    }
});

export default Question;
