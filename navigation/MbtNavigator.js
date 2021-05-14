import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const MbtNavigator=createStackNavigator({
    Login:LoginScreen,
    Register:RegisterScreen
})

export default createAppContainer(MbtNavigator);