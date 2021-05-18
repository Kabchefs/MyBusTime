import React, { useState } from "react";
import { AND_CLIENT_ID ,FB_APP_ID} from '@env';
import { View, StyleSheet, Text, Image, ScrollView,ToastAndroid } from "react-native";
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { Button, TextInput } from "react-native-paper";
import MySocialButton from "../components/MySocialButton";
import { SocialIcon } from 'react-native-elements';
import { instance } from '../utils/axiosConfig';
console.disableYellowBox = true;
export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password,setPass]=useState("");
  
  const login=()=>{
    if(email && password){
      let obj={
        email:email,
        password:password
      }
      instance.post('/users/signin',obj).then(res=>{
        console.log("jii",res);
        if(res.status==200){
          ToastAndroid.show("Signup Success !", ToastAndroid.SHORT);
          props.navigation.navigate({ routeName: "Home" });
        }else if(res.status==201){
          console.log(res.data);
          ToastAndroid.show(res.data.message, ToastAndroid.LONG);
        }
      })
    }
  }

  const signWithGoogle=async ()=>{
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        // iosClientId: IOS_CLIENT_ID,
        androidClientId: `${AND_CLIENT_ID}`,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log(result)
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
Facebook.initializeAsync({
  appId:`${FB_APP_ID}`
})
  const signWithFb=async()=>{
    try {
      
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync( {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(e => console.log(e))
      } else {
        // type === 'cancel'
        console.log("User cancel signin!")
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  }

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
        onPress={signWithFb}
        type='facebook'
        style={styles.socialBt}
      />
      
      <SocialIcon
        title="Google"
        button
        light
        onPress={signWithGoogle}
        type='google'
        style={styles.socialBt}
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
        onChangeText={(p)=>setPass(p)}
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
        onPress={login}
        uppercase={false}
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
    backgroundColor:'#ffffff'
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
    fontFamily: "Montserrat-SemiBold",
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
    flex: 1,
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
