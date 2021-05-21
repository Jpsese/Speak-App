import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Button from "../components/Button";
import Title from "../components/Title";
import Colors from "../constants/Colors";
import * as FileSystem from 'expo-file-system';
import ApiKeys from "../constants/ApiKeys";
import * as firebase from "firebase";

if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.firebaseConfig);
}

const FeedbackScreen = ({ navigation }) => {
    const { player, card, recording, players } = navigation.state.params;
    const [wordCount, setWordCount] = useState(0);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [answer, setAnswer] = useState('');
    const [grammar, setGrammar] = useState('');
    useEffect(() => {
        // test();
        convertSpeechToText().then(data => {
            console.log(data);
            if (data[0].results[0].alternatives[0].transcript) {
                setAnswer(data[0].results[0].alternatives[0].transcript);
                deleteRecordingFile();
                setWordCount(answer.split(" ").length);
                if (wordCount >= 100) {
                    player.score[2] = 20;
                } else if (wordCount <= 80 && wordCount >= 99) {
                    player.score[2] = 15;
                } else if (wordCount <= 50 && wordCount >= 79) {
                    player.score[2] = 10;
                } else {
                    player.score[2] = 5;
                }
                checkGrammar(data[0].results[0].alternatives[0].transcript);
            } else {
                setAnswer("No answer provided");
                setIsEvaluating(true);
            }
        }).catch(err => {
            setAnswer("Answer was not evaluated properly");
            setIsEvaluating(true);
        });

    }, [])

    const test = async () => {
        const storage = firebase.storage().ref('audio');
        const uri = recording.getURI();
        const options = { encoding: FileSystem.EncodingType.Base64 };
        await FileSystem.readAsStringAsync(uri, options).then(data => {
            console.log(data);
            storage.putString(data, 'base64', { contentType: 'audio/x-wav' }).then(() => {
                storage.getDownloadURL().then(url => {
                    console.log(url);
                })
            })
        });

    }

    const checkGrammar = async (ans) => {
        let incorrect = 0;
        console.log(ans);
        try {
            const response = await fetch('https://asia-east2-speak-app-d887d.cloudfunctions.net/checkGrammar', {
                method: 'POST',
                body: ans
            })
            const data = await response.json();
            console.log(data);
            let offset = 0;
            let length = 0;
            let newText = "";
            let cursor = 0;
            let repls = [];
            data["matches"].forEach(item => {
                offset = item["offset"];
                length = item["length"];
                if (cursor > offset) {
                } else {
                    newText = newText + ans.substring(cursor, offset);
                    repls = item["replacements"];
                    if (repls && Object.keys(repls).length > 0) {
                        incorrect++;
                        newText = newText + repls[0]['value'];
                    }
                    cursor = offset + length;
                }
            })
            if (cursor < ans.length) {
                newText += ans.substring(cursor, ans.length);
            }
            setGrammar(newText);
            if (incorrect <= 5 && incorrect >= 1) {
                player.score[1] = 15
            } else if (incorrect <= 6 && incorrect >= 10) {
                player.score[1] = 10;
            } else if (incorrect >= 11) {
                player.score[1] = 5;
            } else {
                player.score[1] = 20;
            }
            setIsEvaluating(true);
        } catch (err) {
            console.log('Error encountered grammar checker:', err)
        }
    }

    //DELETE RECODING
    const deleteRecordingFile = async () => {
        console.log("Deleting file");
        try {
            const info = await FileSystem.getInfoAsync(recording.getURI());
            await FileSystem.deleteAsync(info.uri)
        } catch (error) {
            console.log("There was an error deleting recording file", error);
        }
    }

    //CONVERT SPEECH TO TEXT
    const convertSpeechToText = async () => {
        try {
            const info = await FileSystem.getInfoAsync(recording.getURI());
            console.log(`FILE INFO: ${JSON.stringify(info)}`);
            const uri = info.uri;
            console.log(uri);

            const formData = new FormData();
            formData.append('file', {
                uri,
                name: 'speech2text.wav',
            });

            const response = await fetch('https://asia-east2-speak-app-d887d.cloudfunctions.net/convertSpeechToText', {
                method: 'POST',
                body: formData
            });
            const data = response.json();
            return data;
        } catch (error) {
            console.log('There was an error reading file', error);
        }
    }
    const goToCategoriesHandler = () => {
        navigation.navigate('TeacherScore', { players, card, player })
    }
    if (!isEvaluating) {
        return (
            <View style={styles.evaluateMain}>
                <View style={styles.evaluateHeader} >
                    <Title title="Evaluating Answer" />
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Title title="Feedback" />
                </View>
                <View style={styles.errorContainer}>
                    <Text style={styles.subTitle}>Answer</Text>
                    <Text style={styles.content}>{answer}</Text>
                </View>
                <View style={styles.correctContainer}>
                    <Text style={styles.subTitle}>Correct</Text>
                    <Text style={styles.content}>{grammar}</Text>
                </View>
                <View style={styles.footerContainer}>
                    <Button content="OK" buttonPress={goToCategoriesHandler} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    evaluateMain: {
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.secondary
    },
    evaluateHeader: {
        width: "100%",
        alignItems: "center",
    },
    mainContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.secondary
    },
    headerContainer: {
        width: "100%",
        height: "20%",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "3%"
    },
    errorContainer: {
        width: "100%",
        height: "32%",
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    correctContainer: {
        width: "100%",
        height: "32%",
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    footerContainer: {
        width: "100%",
        height: "16%",
        alignItems: "center"
    },
    subTitle: {
        fontSize: 25,
        textAlign: "center",
        fontFamily: "open-sans",
        color: Colors.primary
    },
    content: {
        fontSize: 15,
        fontFamily: "open-sans",
        color: Colors.primary
    }


})

export default FeedbackScreen;