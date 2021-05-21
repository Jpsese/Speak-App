import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Button from "../components/Button";
import Title from "../components/Title";
import Colors from "../constants/Colors";

const GamePlayers = ({ navigation }) => {

    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [player3, setPlayer3] = useState("");
    const [player4, setPlayer4] = useState("");

    const goToCategoriesHandler = () => {
        const players = [player1, player2, player3, player4];
        const {categoryList} = navigation.state.params;
        navigation.navigate("GameCategory", { players, categoryList });
    }
    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Title title="Enter Player/s" />
            </View>
            <View style={styles.body}>
                <View style={styles.bodyPlayer}>
                    <Text style={styles.defaultPlayerFont}>Player 1</Text>
                    <TextInput style={styles.nameInput} value={player1} placeholder="Enter Player 1" onChangeText={text => { setPlayer1(text) }} />
                </View>
                <View style={styles.bodyPlayer}>
                    <Text style={styles.defaultPlayerFont}>Player 2</Text>
                    <TextInput style={styles.nameInput} value={player2} placeholder="Enter Player 2" onChangeText={text => { setPlayer2(text) }} />
                </View>
                <View style={styles.bodyPlayer}>
                    <Text style={styles.defaultPlayerFont}>Player 3</Text>
                    <TextInput style={styles.nameInput} value={player3} placeholder="Enter Player 3" onChangeText={text => { setPlayer3(text) }} />
                </View>
                <View style={styles.bodyPlayer}>
                    <Text style={styles.defaultPlayerFont}>Player 4</Text>
                    <TextInput style={styles.nameInput} value={player4} placeholder="Enter Player 4" onChangeText={text => { setPlayer4(text) }} />
                </View>
            </View>
            <View style={styles.footer}>
                <Button content="Confirm" buttonPress={goToCategoriesHandler} />
            </View>
        </View>
    );
}

// const GamePlayers = ({navigation}) => {
//     const [player1, setPlayer1] = useState('');
//     const [player2, setPlayer2] = useState('');
//     const [player3, setPlayer3] = useState('');
//     const [player4, setPlayer4] = useState('');

//     const goToCategoryHandler = () => {
//         if(player1 === "" && player2 === "" && player3 === "" && player4 === ""){
//             Alert.alert('Oops!', 'There must be 1 or more player to start the game', [
//                 { text: 'Okay' }
//               ]);
//             return;  
//         }else if(player2 === "" && player3 === "" && player4 === ""){
//             const data = {
//                 Player1:{
//                     name: player1
//                 }
//             }
//             firebase.database().ref(`/GameLobby`).push(data);
//             navigation.navigate("GameCategory");
//         }else if(player3 === "" && player4 === ""){
//             const data = {
//                 Player1:{
//                     name: player1
//                 },
//                 Player2:{
//                     name: player2
//                 }
//             }
//             firebase.database().ref(`/GameLobby`).push(data);
//             navigation.navigate("GameCategory");
//         }else if(player4 === ""){
//             const data = {
//                 Player1:{
//                     name: player1
//                 },
//                 Player2:{
//                     name: player2
//                 },
//                 Player3:{
//                     name: player3
//                 }
//             }
//             firebase.database().ref(`/GameLobby`).push(data);
//             navigation.navigate("GameCategory");
//         }else{
//             const data = {
//                 Player1:{
//                     name: player1
//                 },
//                 Player2:{
//                     name: player2
//                 },
//                 Player3:{
//                     name: player3
//                 },
//                 Player4:{
//                     name: player4
//                 }
//             }
//             firebase.database().ref(`/GameLobby`).push(data);
//             navigation.navigate("GameCategory");
//         }
//     }
//         return (
//                 <View style = {styles.main}>
//                     <View style = {styles.header}>
//                     <Title title="Enter Player/s" />  
//                     </View>
//                     <View style = {styles.body}>
//                         <View style = {styles.bodyPlayer}>
//                             <Text style= {styles.defaultPlayerFont}>Player 1</Text>
//                             <Input
//                             placeholder= "Enter Player 1"
//                             value={player1}
//                             onChangeText = {text => setPlayer1(text)}
//                             />
//                         </View>
//                         <View style = {styles.bodyPlayer}>
//                             <Text style= {styles.defaultPlayerFont}>Player 2</Text>
//                             <Input 
//                             placeholder= "Enter Player 2"
//                             value={player2}
//                             onChangeText = {text => setPlayer2(text)}
//                             />
//                         </View>
//                         <View style = {styles.bodyPlayer}>
//                             <Text style= {styles.defaultPlayerFont}>Player 3</Text>   
//                             <Input 
//                             placeholder= "Enter Player 3"
//                             value={player3}
//                             onChangeText = {text => setPlayer3(text)}
//                             />
//                         </View>
//                         <View style = {styles.bodyPlayer}>
//                             <Text style= {styles.defaultPlayerFont}>Player 4</Text>
//                             <Input 
//                                 placeholder= "Enter Player 4"
//                                 value={player4}
//                                 onChangeText = {text => setPlayer4(text)}
//                                 />
//                         </View>
//                     </View>
//                     <View style = {styles.footer}>
//                         <Button 
//                         content="Start"
//                         buttonPress={goToCategoryHandler}
//                         />
//                     </View>
//                 </View>    
//         );      
// };


const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.secondary
    },
    header: {
        paddingTop: "10%",
        height: "20%",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    body: {
        flexDirection: 'row',
        height: "60%",
        width: "100%",
        flexWrap: 'wrap'
    },
    bodyPlayer: {
        width: "50%",
        height: "50%",
        alignItems: "center",
        justifyContent: 'space-around'
    },
    footer: {
        height: "20%",
        width: "100%",
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    defaultPlayerFont: {
        fontFamily: "open-sans-bold",
        fontSize: 20,
        color: Colors.primary,
    },
    nameInput: {
        borderWidth: 2,
        borderRadius: 10,
        width: 150,
        height: 60,
        textAlign: 'center',
        borderColor: Colors.primary,
        color: Colors.primary, 
        fontSize: 23,
    }

});

export default GamePlayers;


