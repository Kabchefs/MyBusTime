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

const MbtNavigator=createStackNavigator({
    Login:LoginScreen,
    Register:RegisterScreen,
    OTPVerify:OTPVerifyScreen,
    CheckMail:CheckMailScreen,
    ForgotPassword:ForgotPasswordScreen,
    ResetPassword:ResetPasswordScreen

})

export default createAppContainer(MbtNavigator);