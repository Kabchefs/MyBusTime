import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert ,ToastAndroid} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { instance } from '../utils/axiosConfig';
import axios from 'axios';

export default function RegisterScreen(props) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  const user=props.navigation.getParam('data');

  const hasErrors = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!user?.name && !name) {
      Alert.alert("Invalid Input!", "Name must not be empty", [
        { text: "Okay", style: "destructive" },
      ]);
      return false;
    } else if (!user?.email &&!re.test(email)) {
      Alert.alert("Invalid Input!", "Plase enter valid email", [
        { text: "Okay", style: "destructive" },
      ]);
      return false;
    } else if (!phone || !(phone.length == 10) ) {
      Alert.alert("Invalid Input!", "Please Enter 10 digit No.", [
        { text: "Okay", style: "destructive" },
      ]);
      return false;
    } else if (!user && (cpassword != password)) {
      Alert.alert(
        "Invalid Input!",
        "Password and Confirm password must be same!",
        [{ text: "Okay", style: "destructive" }]
      );
      return false;
    } else if (!user && (cpassword == "" || password == "")) {
      Alert.alert("Invalid Input!", "Password can't be empty!", [
        { text: "Okay", style: "destructive" },
      ]);
      return false;
    } else {
      return true;
    }
  };

  const register = () => {
    if (hasErrors()) {
      let obj={};
      if(!user){
         obj={
            name:name,
            email:email,
            phone:phone,
            password:password
        }
      }else{
        obj={
          name:user.name,
          email:user.email || email,
          phone:phone,
          image:user.photo,
          googleId:user.googleId,
          fbid:user.facebookId,
          status:true,
          via:user.via
        }
      }
        console.log("I am here!",obj)
        instance.post('users/signup',obj).then(res=>{
            console.log(res.data);
            if(res.status==200){
                ToastAndroid.show("Signup Success !", ToastAndroid.SHORT);
                if(res.data.social){
                  props.navigation.navigate({ routeName: "Home" });
                }else{
                props.navigation.navigate({ routeName: "CheckMail" });
                }
            }else{
              ToastAndroid.show(res.data.message, ToastAndroid.LONG);
            }
        })
      
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headText}>Register to MBT</Text>

      <TextInput
        label="Full Name"
        mode="flat"
        onChangeText={(email) => setName(email)}
        style={styles.input}
        value={user?.name}
        disabled={user?.name}
        theme={{
          colors: {
            primary: "#abb4bd",
          },
        }}
      />
      <TextInput
        label="Email"
        mode="flat"
        keyboardType="email-address"
        style={styles.input}
        
        value={user?.email}
        disabled={user?.email}
        onChangeText={(email) => setEmail(email)}
        theme={{
          colors: {
            primary: "#abb4bd",
          },
        }}
      />

      <TextInput
        label="Mobile Number"
        mode="flat"
        keyboardType="number-pad"
        onChangeText={(phone) => setPhone(phone)}
        theme={{
          colors: {
            primary: "#abb4bd",
          },
        }}
        style={styles.input}
      />
     {!user && <TextInput
        label="Password"
        mode="flat"
        hidden={user}
        secureTextEntry={true}
        onChangeText={(email) => setPassword(email)}
        style={styles.input}
        theme={{
          colors: {
            primary: "#abb4bd",
          },
        }}
      />}
     {!user && <TextInput
        label="Confirm Password"
        mode="flat"
        secureTextEntry={true}
        onChangeText={(email) => setcPassword(email)}
        style={styles.input}
        theme={{
          colors: {
            primary: "#abb4bd",
          },
        }}
      />}

      <Button
        mode="contained"
        style={styles.registerButton}
        color={"#179de3"}
        uppercase={false}
        onPress={register}
      >
        <Text style={{ color: "#ffffff" }}>Register</Text>
      </Button>
    </ScrollView>
  );
}

RegisterScreen.navigationOptions = (navOpt) => {
  return {
    headerTitle: "Register",
    headeStyle: {
      textAlign: "center",
    },
    headerTitleAlign: "center",
    headerTitleStyle:{
      display:'none'
    }
  };
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: "#ffffff",
  },
  headText: {
    color: "#1d2029",
    fontSize: 24,
    fontWeight: "400",
    marginLeft: 30,
    fontFamily: "Poppins",
  },

  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  input: {
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "transparent",
    width: 315,
    fontSize: 14,
    fontFamily: "Poppins",
  },
  registerButton: {
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
    width: 315,
    height: 55,
    borderRadius: 5,
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    justifyContent: "center",
    textAlign: "center",
    shadowColor: "rgba(255, 22, 84, 0.25)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
});
