import React, { useState } from "react";
import { StyleSheet, StatusBar, View, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { AppLoading } from "expo";
import Button from "../components/Button";
import Colors from "../constants/Colors";
import Title from "../components/Title";
import * as Font from "expo-font";
import ApiKeys from "../constants/ApiKeys";
import * as firebase from "firebase";
import "@firebase/database";

//firebase
if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.firebaseConfig);
}

//images for Home Screen
var logo = require('../assets/speakapp-logo.png')
var play = require('../assets/play.png')
var settings = require('../assets/settings.png')
var menu = require('../assets/menu.png')
const categoryList = [];

const fetchFonts = async () => {
  return Font.loadAsync({
    "open-sans": require("../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  });
};

//Dummy Home
const Home = ({ navigation }) => {

  const [dataLoaded, setDataLoaded] = useState(false);
  const fetchCategoryList = async () => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    //   method: 'GET'
    // }).then(data => {
    //   console.log(data);
    // });

    return firebase
      .database()
      .ref("Categories")
      .once("value", (snap) => {
        snap.forEach((childSnap) => {
          let category = {
            id: childSnap.key,
            name: childSnap.child("Category-name").val(),
            questions: childSnap.child("Questions").val(),
            images: childSnap.child("Images").val(),
          }
          categoryList.push(category);
        });
      });
  };

  const goToPlayersHandler = () => {
    navigation.navigate("GamePlayers", { categoryList });
  };

  if (!dataLoaded) {
    fetchFonts().then(() => {
      fetchCategoryList().then(() => {
        setDataLoaded(true);
      });
    });
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View >
            <Image source={menu} style={styles.headerLogo} />
          </View>
          <View style={styles.headerLogo}>
            <Image source={settings} style={styles.headerLogo} />
          </View >
        </View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoContainer}
            source={logo} />
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={goToPlayersHandler}>
            <Image source={play} style={styles.playContainer} />
          </TouchableOpacity>
        </View>
      </View>

    );
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary
  },
  headerContainer: {
    width: "100%",
    height: "13%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerLogo: {
    width: 110,
    height: 110,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "47%",
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "40%",
    padding: "5%"
  },

});
