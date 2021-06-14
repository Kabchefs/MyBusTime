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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from 'react-navigation-drawer';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    PrivacyPolicy:PrivacyPolicyScreen,
    Connect:ConnectScreen,
})

// const Logoff=()=>{
//     AsyncStorage.removeItem('user');
//     return(
//         <LoginScreen/>
//     )
// }

const MainNavigator=createDrawerNavigator({
    Home: {
        screen:HomePage,
        navigationOptions :{
            itemStyle:{marginTop:30},
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
              <MaterialCommunityIcons name="home" size={24}  color='rgb(23, 157, 227)' style={{marginRight:-10}}/>
            ),
          },
          contentOptions: {
            activeTintColor: '#e91e63',
            itemsContainerStyle: {
              marginTop:50,
            },
            iconContainerStyle: {
              opacity: 1
            },
            itemStyle:{
                marginTop:100,
                paddingTop:30,
            }
          },
         
        
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
    
            drawerLabel: 'Profile',
            drawerIcon: ({ tintColor }) => (
              <MaterialCommunityIcons name="account" size={22} color="rgb(23, 157, 227)"  style={{marginRight:-10}} />
            ),
          }
        
      },
      Connect:{
        screen: ConnectScreen,
        navigationOptions: {
    
            drawerLabel: 'Connect',
            drawerIcon: ({ tintColor }) => (
              <Ionicons name="search" size={22} color="rgb(23, 157, 227)" style={{marginRight:-10}} />
            ),
          }
        


      },

      PrivacyPolicy: {
        screen: PrivacyPolicyScreen,
        navigationOptions: {
    
            drawerLabel: 'Privacy Policy',
            drawerIcon: ({ tintColor }) => (
              <MaterialCommunityIcons name="information" size={24} color="rgb(23, 157, 227)"  style={{marginRight:-10}} />
            ),
          }
      },
      ResetPassword: {
        screen:ResetPasswordScreen,
        navigationOptions: {
    
            drawerLabel: 'Reset Password',
            drawerIcon: ({ tintColor }) => (
              <MaterialCommunityIcons name="security" size={22} color="rgb(23, 157, 227)"  style={{marginRight:-10}}/>
            ),
          }
       
      },
   
    })

// const MainNavigtor=createDrawerNavigator(
//     {
       

//     //   Main:MbtNavigator,
//     //   PrivacyPolicy:PrivacyPolicyScreen,
//     //   ResetPassword:ResetPasswordScreen,
//     // //   }
//     // //   ,{
//     // //   contentOptions: {
//     // //      // paddingTop:80,
//     // //     activeTintColor: 'rgb(23, 157, 227)',
//     // //     itemStyle:{
//     // //         marginTop:20
//     // //     }
//     // //   },

        
//     });


export default createAppContainer(MainNavigator);