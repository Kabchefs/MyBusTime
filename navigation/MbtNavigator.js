import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OTPVerifyScreen from '../screens/OTPVerfiyScreen';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import CheckMailScreen from '../screens/CheckMailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import HomeRoute from '../screens/HomeScreen';
import {Ionicons} from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import StartupScreen from '../screens/StartupScreen';
import ConnectScreen from '../screens/ConnectScreen';
import StopDetailsScreen from '../screens/StopDetailsScreen';
import RouteDetailsScreen from '../screens/RouteDetailsScreen';

const HomePage= createMaterialBottomTabNavigator({
    Main:{screen:HomeRoute,navigationOptions:{
        tabBarLabel:'Home',
        
        tabBarIcon:(tabOp)=>{
          
            return <Ionicons name="home"  size={25}  color="white"/>;
        },
        tabBarColor:'rgb(23, 157, 227)'
    }},
    Connect:{screen:ConnectScreen,navigationOptions:{
        tabBarLabel:'Connect',
        
        tabBarIcon:(tabOp)=>{
            return <Ionicons name="search" size={25} color="white" />;
        },
        tabBarColor:'rgb(23, 157, 227)'
    }},
    Profile:{screen:ProfileScreen,navigationOptions:{
         tabBarLabel:'Profile',
        tabBarIcon:(tabOp)=>{
            return <Ionicons name="person" size={25} color="white" />;
        },
        tabBarColor:'rgb(23, 157, 227)'
    }}
   
},{
    activeColor:'white',
    shifting:true
})

const MbtNavigator=createStackNavigator({
    Startup:StartupScreen,
        
    Login:LoginScreen,
    Register:RegisterScreen,
    OTPVerify:OTPVerifyScreen,
    CheckMail:CheckMailScreen,
    ForgotPassword:ForgotPasswordScreen,
    ResetPassword:ResetPasswordScreen,
    Home:{screen:HomePage,navigationOptions:{headerShown:false}},
    Profile:ProfileScreen,
    StopDetails:StopDetailsScreen,
    RouteDetails:RouteDetailsScreen,    
    Connect:ConnectScreen,


})




export default createAppContainer(MbtNavigator);