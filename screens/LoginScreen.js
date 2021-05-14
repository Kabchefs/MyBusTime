import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button, TextInput } from "react-native-paper";
import MySocialButton from "../components/MySocialButton";
export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          style={styles.logo}
          source={require("../assets/images/busLogo.png")}
        />
      </View>
      <View style={styles.logoView}>
        <Text style={styles.logoText}>MyBusTime</Text>
      </View>
      <View style={styles.button}>
        <MySocialButton
          name="facebook"
          backgroundColor="#3b5998"
          mode="outlined"
          title="Facebook"
          onPress={() => console.log("fb")}
        />

        <MySocialButton
          name="google"
          backgroundColor="#1d2029"
          mode="outlined"
          title="Google"
          onPress={() => console.log("gl")}
        />
      </View>
      <View style={styles.orView}>
        <Text style={styles.orText}>or</Text>
      </View>

      <TextInput
        label="Email ID"
        mode="flat"
        value={email}
        onChangeText={(email) => setEmail(email)}
        style={styles.input}
        theme={{
          colors: {
            primary: "#abb4bd",
          },
        }}
      />
      <TextInput
        label="Password"
        mode="flat"
        secureTextEntry={true}
        style={styles.input}
        theme={{
          colors: {
            primary: "#abb4bd",
          },
        }}
      />
      <Button style={styles.forgot} uppercase={false} color={"#179de3"}>
        Forgot Password?
      </Button>
      <Button
        mode="contained"
        style={styles.login}
        color={"#179de3"}
        uppercase={false}
        disabled={true}
      >
        Login
      </Button>
      <Text
        style={styles.register}
        color={"#179de3"}
        uppercase={false}
        onPress={() => props.navigation.navigate({ routeName: "Register" })}
      >
        Don't have an account?{" "}
        <View style={styles.registerNow}>
          <Text style={{ color: "#179de3" }}>Register Now</Text>
        </View>
      </Text>
    </View>
  );
}

LoginScreen.navigationOptions = (navOpt) => {
  return {
    headerTitle: "My Bus Time",
    headeStyle: {
      textAlign: "center",
    },
    headerTitleAlign: "center",
  };
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  logo: {
    height: 137,
    width: 137,
    marginLeft: "auto",
    marginRight: "auto",
  },
  logoText: {
    width: 139,
    height: 34,
    color: "#179de3",
    fontFamily: "Poppins",
    fontSize: 21,
    textAlign: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  orText: {
    width: 50,
    height: 35,
    color: "#abb4bd",
    fontFamily: "Poppins",
    fontSize: 18,
    textAlign: "center",
  },
  orView: {
    alignItems: "center",
    textAlign: "center",
    paddingTop: 10,
  },
  forgot: {
    marginTop: 10,
    marginLeft: 150,
    fontFamily: "Poppins",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 2,
  },
  register: {
    marginTop: 10,
    marginTop: 12,
    textAlign: "center",
    fontSize: 14,
    color: "#179de3",
    fontFamily: "Poppins",
    fontWeight: "400",
    justifyContent: "space-evenly",
  },
  registerNow: {
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 12,
    paddingTop: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 18,
    backgroundColor: "transparent",
  },
  socialText: {
    width: 39,
    height: 12,
    color: "#1d2029",
    fontFamily: "Poppins",
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 2,
  },

  login: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 18,
    width: 315,
    height: 46,
    borderRadius: 4,
  },
  loginText: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    width: 315,
    height: 46,
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  logoView: {
    margin: 10,
    paddingTop: 20,
    alignItems: "center",
    textAlign: "center",
  },
});
