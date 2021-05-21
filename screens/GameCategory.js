import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Title from "../components/Title";
import CategoryContainer from "../components/CategoryContainer";
import Colors from "../constants/Colors";

const GameCategory = ({ navigation }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const { categoryList } = navigation.state.params;
  const { players } = navigation.state.params;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title title="Choose a Category" />
      </View>
      <View style={styles.categoriesContainer}>
        <CategoryContainer
          categoryList={categoryList}
          navigation={navigation}
          players={players}
        />
      </View>
    </View>
  );
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
    flex: 2,
    justifyContent: "center",
    height: "30%"
  },
  categoriesContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    height: "70%"
  },
});
