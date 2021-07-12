
import React ,{useState,useEffect}from 'react';
import { Platform, View, StyleSheet, ScrollView ,FlatList,Image} from "react-native";
import {Button,DataTable, TextInput, Paragraph,Avatar, Surface,Appbar,StatusBar, BottomNavigation, Text ,Card,Drawer} from 'react-native-paper';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function AboutUsScreen (props) 
{
 
const TopNavBar = () =>
{

  return (
    <Appbar.Header
    style={{ backgroundColor: 'rgb(23, 157, 227)' }}
    >

    <Appbar.Action onPress={()=>props.navigation.toggleDrawer()} icon={() => <MaterialCommunityIcons name="format-align-left" size={24}  color="white"/>}/>

       <Appbar.Content title="About us" />
     </Appbar.Header>


  );
};


  return (
   <View>
      <TopNavBar />
      <ScrollView style={styles.routesBody}>
          <View style={styles.image}>
          <Image
          style={{height:110,width:110,alignSelf:'center',marginBottom:-15}}
         
          source={require("../assets/images/busLogo.png")}
        />

          </View>
          <View style={{flex:1,flexDirection:'column'}}>
              <Paragraph style={styles.policyDetails}>
              Buses are the most popular and convenient mode of transportation in India. More than 1.6 million buses
               are registered in India, and the public bus sector operates 170,000 buses carrying roughly 70 million
                people per day. But due to the decentralized system, passengers face lots of issues. They can not track
                 bus time table, live locations. They can not find a single platform for bus ticket reservations.
                  MyBusTime provides solution for all these issue. Now you can find best bus routes for your destination.
                   We will try to provide you a timetable and live location for all public and private buses.

              </Paragraph>
              <Text style={{fontFamily:'Roboto-Regular',fontSize:15,paddingLeft:10,paddingTop:20,textAlign:'center'}}>Version 1.0</Text>  

          </View>

   
          

</ScrollView>
</View>
        
  );
};


AboutUsScreen.navigationOptions = (navOpt) => {
    return {
        headerShown: false
    };
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
  },
  image: {
    flex: 1,
  },
  routesBody:{
    width:'99%',
    height:'100%',
    alignSelf:'center',
    backgroundColor:'#ffffff',
    borderRadius:5,

  },
 
  policyDetails:{
      paddingBottom:20,
      paddingLeft:'5%',
     paddingRight:'5%',
     fontSize:15,
     fontFamily:'Roboto-Regular',
     borderBottomWidth:1,
     borderBottomColor:'#f1f1f9',
    




  }
});