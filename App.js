import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import  AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import MbtNavigator from './navigation/MbtNavigator';

const fetchFonts=()=>{
  return Font.loadAsync({
     'Poppins':require('./assets/fonts/Poppins-Regular.ttf'),
     'Poppins-Bold':require('./assets/fonts/Poppins-Bold.ttf'),
     'Poppins-SemiBold':require('./assets/fonts/Poppins-SemiBold.ttf'),
     'Poppins-Medium':require('./assets/fonts/Poppins-Medium.ttf')
   })
 }

export default function App() {
  const [fontLoaded,setfontLoade]=useState(false);

    if(!fontLoaded){
      return(
       <AppLoading startAsync={fetchFonts} onFinish={()=>setfontLoade(true)} onError={(e)=>console.log(e)}/>
      )
    }
  return (
    <MbtNavigator/>
  );
}
