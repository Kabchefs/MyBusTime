import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OTPVerifyScreen from '../screens/OTPVerfiyScreen';
import CheckMailScreen from '../screens/CheckMailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const MbtNavigator=createStackNavigator({
    Login:LoginScreen,
    Register:RegisterScreen,
    OTPVerify:OTPVerifyScreen,
    CheckMail:CheckMailScreen,
    ForgotPassword:ForgotPasswordScreen,
    ResetPassword:ResetPasswordScreen,
    Home:HomeScreen,
    Profile:ProfileScreen,

})


export default createAppContainer(MbtNavigator);