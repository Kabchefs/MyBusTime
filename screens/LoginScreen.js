import React, { useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import MySocialButton from "../components/MySocialButton";
import { SocialIcon } from 'react-native-elements';
export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  return (
    <ScrollView style={styles.container}>
      <View style={styles.image}>
        <Image
          style={styles.logo}
          source={require("../assets/images/busLogo.png")}
        />
      </View>
      <View style={styles.logoView}>
        <Text style={styles.logoText}>MyBusTime</Text>
      </View>
      <View style={styles.socialButton}>
      <SocialIcon
        title="Facebook"
        button
        light
        type='facebook'
        style={styles.socialBt}
      />
      
      <SocialIcon
        title="Google"
        button
        light
        type='google'
        style={styles.socialBt}
      />

        {/* <MySocialButton
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
        /> */}
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
      <Text style={styles.forgot} uppercase={false}
        onPress={() => props.navigation.navigate({ routeName: "ForgotPassword" })}
      >
        Forgot Password?
      </Text>
      <Button
        mode="contained"
        style={styles.loginButton}
        color={"#179de3"}
        uppercase={false}
      //  disabled={true} 
      >
        <Text style={{ color: '#ffffff' }}>Login</Text>
      </Button>
      <Text
        style={styles.register}
        uppercase={false}
        onPress={() => props.navigation.navigate({ routeName: "Register" })}
      >
        Don't have an account?{" "}Register Now
      </Text>
    </ScrollView>
  );
}

LoginScreen.navigationOptions = (navOpt) => {

  return {
    headerShown: false,
    headerTitle: "My Bus Time",
    headeStyle: {
      textAlign: "center",
    },
    headerTitleAlign: "center",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10,
  },
  logo: {
    height: 137,
    width: 137,
    marginLeft: "auto",
    marginRight: "auto",
  },
  logoText: {
    marginTop: -60,
    width: 139,
    height: 34,
    color: "#179de3",
    fontFamily: "Montserrat-Regular",
    fontSize: 22,
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
    marginTop: 20,
    marginLeft: 200,
    fontFamily: "Poppins",
    fontSize: 12,
    color: "#179de3",
    fontWeight: "400",
  },
  register: {
    marginTop: 25,
    marginBottom: 30,
    textAlign: "center",
    fontSize: 12,
    color: "#179de3",
    fontFamily: "Poppins",
    fontWeight: "400",
  },
  registerNow: {
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 15,
    paddingTop: 20,
  },
  socialButton: {
    flexDirection: "row",
  },
  socialBt:{
    fontFamily:"Poppins",
    color:'#1d2029',
    flex: 1,
    padding: 7,
    margin: 15,
    width: 100,
    height: 45,
    borderRadius: 5,


  },
  input: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: 'transparent',
    width: 315,
    fontSize: 14,
    fontFamily: 'Poppins',
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

  loginButton: {
    alignSelf: 'center',
    marginTop: 23,
    width: 315,
    height: 55,
    borderRadius: 5,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    justifyContent: 'center',
    textAlign: 'center',
    shadowColor: 'rgba(255, 22, 84, 0.25)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },

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
