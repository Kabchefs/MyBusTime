
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
          style={{height:100,width:100,alignSelf:'center',marginBottom:-10}}
         
          source={require("../assets/images/busLogo.png")}
        />

          </View>
          <View style={{flex:1,flexDirection:'column'}}>
              <Paragraph style={styles.policyDetails}>
              Please read these terms and conditions prior to using the products and services 
              offered by Kabchef Labs Private Ltd. By using the product, you agree to be legally
               bound by the terms and conditions, privacy policy and terms of services 
               (including without limitations all disclaimers, exclusion of warranties and 
               limitations of liability contained therein). If you do not agree with these terms,
                please do not use the products and services offered by Kabchef Labs

              </Paragraph>
              <Text style={{fontFamily:'Roboto-Regular',fontSize:15,paddingLeft:10,paddingTop:20}}>About us Version 1.0</Text>  

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
      paddingLeft:5,
     paddingRight:5,
     fontSize:16,
     fontFamily:'Roboto-Regular',
     textAlign:'center',
     borderBottomWidth:1,
     borderBottomColor:'#f1f1f9',




  }
});