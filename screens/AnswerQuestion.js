import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import Colors from "../constants/Colors";
import Title from "../components/Title";


const AnswerQuestion = ({ navigation }) => {
    const { card, player, players } = navigation.state.params;
    const [recording, setRecording] = useState();
    const [startGame, setStartGame] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [count, setCount] = useState(30);

    //configuration to recording option 
    const recordingOptions = {
        android: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
        },
        ios: {
            extension: '.wav',
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
        },
    };

    useEffect(() => {
        let interval = null
        if (count === 30) {
            player.score[0] = card.scoreToGain;
            startRecording();
        }
        interval = setInterval(() => {
            setCount(count => count - 1);
        }, 1000)
        if (count === 0) {
            handleStopRecording();
            clearInterval(interval)
            navigation.navigate('FeedbackScreen', { players, card, recording, player })
        }
        return () => clearInterval(interval);
    }, [count])

    const startRecording = async () => {
        const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        if (status !== 'granted') return;
        setIsRecording(true);
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        });
        const recording = new Audio.Recording();
        try {
            await recording.prepareToRecordAsync(recordingOptions);
            await recording.startAsync();
        } catch (error) {
            stopRecording();
        }
        setRecording(recording);
    }

    //RESET RECORDING
    const resetRecording = () => {
        setRecording(null);
    }

    //STOP RECORDING
    const stopRecording = async () => {
        setIsRecording(false);
        try {
            await recording.stopAndUnloadAsync();
        } catch (error) {
        }
    }

    const handleStopRecording = () => {
        resetRecording();
        stopRecording();
    }


    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Title title="Time to Answer!"/>
            </View>    
            <View style={styles.timer}>
                <View style={styles.counterCircle}>
                    <Text style={styles.count}>{count}</Text>
                </View>
            </View>
        </View>
    );
};

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
        height: "30%",
        alignItems: "center",
        padding: "5%"
    },
    timer: {
        flex: 0.3,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    counterCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: "#34ebd8",
        alignItems: 'center',
        justifyContent: 'center',
    },
    count: {
        fontSize: 100,
        color: "#34ebd8",
    }
});

export default AnswerQuestion;