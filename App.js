import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SpeakAppNavigator from "./navigation/SpeakAppNavigator";
import { AppLoading } from "expo";
import * as Font from "expo-font";

/** 
 * Developers:
 * John Patrick D. Sese
 * Royette Manaois
 * Renphil Ian Balantin
 * Genrie L. Gayaso
 * 
 * Date: April 25, 2020
 * */
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  console.disableYellowBox = true;

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    // <SafeAreaView>
    <SpeakAppNavigator />
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b2b",
    alignItems: "center",
    justifyContent: "center",
  },
});
