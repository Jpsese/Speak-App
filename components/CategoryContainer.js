import React from "react";
import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import Button from "./Button";

const CategoryContainer = ({ navigation, players, categoryList }) => {
  const goToShuffleScreen = (category) => {
    navigation.navigate("ShuffleScreen", { players, category });
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={false}
        numColumns={2}
        data={categoryList}
        renderItem={({ item }) => (
          <Button
            content={item.name}
            buttonPress={() => goToShuffleScreen(item)}
            style={styles.button}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default CategoryContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: Dimensions.get("window").width - 50,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 400,
  },
  list: {
    alignItems: "center",
  },
  button: {
    paddingVertical: 15,
    height: 100
  },
});
