import React from 'react';
import { View, Text,SafeAreaView,ScrollView,Image,StyleSheet,TouchableOpacity,TouchableHighlight,StatusBar} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useTheme,Avatar,Title,Caption,Paragraph, Drawer, TouchableRipple,Switch} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';

export default function ContentComponent(props) {

    return (
        <TouchableOpacity activeOpacity={1} style={styles.drawerTransparent}>
        <ScrollView >
            <SafeAreaView style={styles.droidSafeArea}>
            <View style={styles.header}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={require('../assets/images/busLogo.png')}
                                color={'white'}
                                size={65}
                                backgroundColor={'white'}
                              
                            />
                         
                            <View style={{marginLeft:15,marginTop:8, flexDirection:'column'}}>
                                <Title style={styles.title}>MyBusTime</Title>
                            </View>
                        </View>
             </View>
             <View style={styles.line}></View>
             <TouchableHighlight underlayColor={'rgba(0,0,0.2)'} onPress={()=>props.navigation.navigate({routeName:'Home'})}>
                 <View style={styles.row}>
                 <MaterialCommunityIcons name="home" size={24} color='rgb(23, 157, 227)' />
                 <Text style={styles.text}>Home</Text>
                 </View>
             </TouchableHighlight>

             <TouchableHighlight underlayColor={'rgba(0,0,0.2)'} onPress={()=>props.navigation.navigate({routeName:'Profile'})}>
                 <View style={styles.row}>
                 <MaterialCommunityIcons name="account" size={22} color="rgb(23, 157, 227)" />
                 <Text style={styles.text}>Profile</Text>
                 </View>
             </TouchableHighlight>

             <TouchableHighlight underlayColor={'rgba(0,0,0.2)'} onPress={()=>props.navigation.navigate({routeName:'Connect'})}>
                 <View style={styles.row}>
                 <Ionicons name="search" size={22} color="rgb(23, 157, 227)"  />
                 <Text style={styles.text}>Connect</Text>
                 </View>
             </TouchableHighlight>

             <TouchableHighlight underlayColor={'rgba(0,0,0.2)'} onPress={()=>props.navigation.navigate({routeName:'PrivacyPolicy'})}>
                 <View style={styles.row}>
                 <MaterialCommunityIcons name="information" size={24} color="rgb(23, 157, 227)" />
                 <Text style={styles.text}>Privacy Policy</Text>
                 </View>
             </TouchableHighlight>

             <TouchableHighlight underlayColor={'rgba(0,0,0.2)'} onPress={()=>props.navigation.navigate({routeName:'ResetPassword'})}>
                 <View style={styles.row}>
                 <MaterialCommunityIcons name="security" size={22} color="rgb(23, 157, 227)"  />
                 <Text style={styles.text}>Reset Password</Text>
                 </View>
             </TouchableHighlight>

             <TouchableHighlight underlayColor={'rgba(0,0,0.2)'} onPress={()=>console.log("signout")}>
                 <View style={styles.bottomSection}>
                 <MaterialCommunityIcons name="exit-to-app" size={22} color="rgb(23, 157, 227)"  />
                 <Text style={styles.text}>Sign Out</Text>
                 </View>
             </TouchableHighlight>


             </SafeAreaView>

        </ScrollView>
        </TouchableOpacity>

        
    );

}
const styles = StyleSheet.create({
    
    drawerTransparent:{
        flex:1,
        backgroundColor:'transparent',        

    },
    header: {
        paddingLeft: 20,
        paddingTop:50,
      //  backgroundColor:'rgb(23, 157, 227)',
      backgroundColor: 'rgb(23, 157, 227)',
        paddingBottom:30
      },
      title: {
        fontSize: 18,
        marginTop: 3,
        fontFamily:'Roboto-Regular',
        color:'#ffffff'
      },
      line:{
          width:'100%',
          alignSelf:'center',
          height:1,
         // backgroundColor:'gray',
       borderTopColor: '#f4f4f4',
          marginLeft:15,
          marginRight:15,
          marginBottom:15
      },
      row:{
          flexDirection:'row',
          paddingVertical:15,
          paddingLeft:30
      },
      text:{
          fontSize:16,
          marginLeft:20,
          fontFamily:'Roboto-Regular',
        
      },
      bottomSection:{
        flexDirection:'row',
        paddingVertical:25,
        paddingLeft:30,
       // paddingTop:'90%',
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1   
      },
      droidSafeArea: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
     
})