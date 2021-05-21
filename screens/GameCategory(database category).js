import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Title from "../components/Title";
import CategoryContainer from "../components/CategoryContainer";
import Colors from "../constants/Colors";

import { AppLoading, SplashScreen } from "expo";
import ApiKeys from "../constants/ApiKeys";
import * as firebase from "firebase";
import "@firebase/database";

//firebase
if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.firebaseConfig);
}

const GameCategory = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = () => {
    return firebase
      .database()
      .ref()
      .child("Categories")
      .on("value", (snap) => setCategoryList(snap.val()));
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchCategoryList}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
        autoHideSplash={false}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title title="Choose a Category" />
        </View>
        <View style={styles.categoriesContainer}>
          <CategoryContainer categoryList={categoryList} />
        </View>
      </View>
    );
  }
};

export default GameCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.secondary,
  },
  titleContainer: {
    flex: 3,
    justifyContent: "center",
  },
  categoriesContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
