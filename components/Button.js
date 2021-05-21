import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.buttonPress.bind(this, props.content)}>
      <View style={{ ...styles.container, ...props.style }}>
        <Text style={styles.content}>{props.content}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.primary,
    borderWidth: 2,
    margin: 10,
    width: Dimensions.get("window").width / 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 50
  },
  content: {
    color: Colors.primary,
    fontFamily: "open-sans",
    padding: 10,
    textAlign: "center",
  },
});
