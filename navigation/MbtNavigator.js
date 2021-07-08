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
import { createDrawerNavigator} from 'react-navigation-drawer';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import ContentComponent from './ContentComponent';
import LeaderBoardScreen from '../screens/LeaderBoardScreen';
import SearchingScreen from '../screens/SearchingScreen';
import Chat from '../screens/chat/Chat';
import ChatRoom from '../screens/chat/ChatRoom';
import AboutUsScreen from '../screens/AboutUsScreen';



const windowWidth = Dimensions.get('window').width;

const HomePage = createMaterialBottomTabNavigator({
  Main: {
    screen: HomeRoute, navigationOptions: {
      tabBarLabel: 'Home',

      tabBarIcon: (tabOp) => {

        return <Ionicons name="home" size={25} color="white" />;
      },
      tabBarColor: 'rgb(23, 157, 227)'
    }
  },
  Connect: {
    screen: ConnectScreen, navigationOptions: {
      tabBarLabel: 'Connect',

      tabBarIcon: (tabOp) => {
        return  <MaterialCommunityIcons name="comment-search" size={25}  color="white" />
      },
      tabBarColor: 'rgb(23, 157, 227)'
    }
  },
  Profile: {
    screen: ProfileScreen, navigationOptions: {
      tabBarLabel:'Profile',
      tabBarIcon:(tabOp)=>{
            return <Ionicons name="person" size={25} color="white" />;
        },
       tabBarColor:'rgb(23, 157, 227)'
    }
}
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
    AboutUs:AboutUsScreen,
    Connect:ConnectScreen,
    LeaderBoard:LeaderBoardScreen,
    Searching:SearchingScreen,
    Chat:Chat,
    // ChatScreen:ChatScreen,
 //   Merge:Merge
})

// const Logoff=()=>{
//     AsyncStorage.removeItem('user');
//     return(
//         <LoginScreen/>
//     )
// }

const MainNavigator = createDrawerNavigator(  {
  Home: {
    screen:MbtNavigator,
  },
  Profile: {
    screen: ProfileScreen
  },
  Connect: {
    screen: ConnectScreen,
  },

  PrivacyPolicy: {
    screen: PrivacyPolicyScreen
  },

}, {
  initialRouteName: 'Home',
  drawerBackgroundColor: '#ffffff',
  drawerLockMode: 'locked-open',
  drawerType: 'front',
  drawerWidth: windowWidth * 3 / 4,
  edgeWidth: 100,
  contentComponent:ContentComponent,
  contentOptions: {
    activeTintColor: "rgb(23, 157, 227)",
    inactiveTintColor: '#000000',
    itemStyle: {
      marginTop: 15,
    }

  }

})

export default createAppContainer(MainNavigator);