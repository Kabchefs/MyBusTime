import React from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function MySocialButton(props) {
  return (
    <View>
      <FontAwesome.Button
        {...props}
        style={{ ...styles.socialButton, ...props.style }}
        onPress={props.onPress}
      >
        {props.title}
      </FontAwesome.Button>
    </View>
  );
}

const styles = StyleSheet.create({
  socialButton: {
    flex: 1,
    padding: 7,
    margin: 15,
    width: 100,
    height: 45,
    borderRadius: 4,
  },
});
