
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import OTPVerify from './components/OTPVerify';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
export default function App() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="OTP Verfiy" component={OTPVerify} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
