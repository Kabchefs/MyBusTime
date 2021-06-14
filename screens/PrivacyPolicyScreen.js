
import React ,{useState,useEffect}from 'react';
import { Platform, View, StyleSheet, ScrollView ,FlatList} from "react-native";
import {Button,DataTable, TextInput, Paragraph,Avatar, Surface,Appbar,StatusBar, BottomNavigation, Text ,Card,Drawer} from 'react-native-paper';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function PrivacyPolicyScreen (props) 
{
 
const TopNavBar = () =>
{

  return (
    <Appbar.Header
    style={{ backgroundColor: 'rgb(23, 157, 227)' }}
    >

    <Appbar.Action onPress={()=>props.navigation.toggleDrawer()} icon={() => <MaterialCommunityIcons name="format-align-left" size={24}  color="white"/>}/>

       <Appbar.Content title="MyBusTime" />
     </Appbar.Header>


  );
};


  return (
    <ScrollView >
      <TopNavBar />
      <View style={styles.routesBody}>
          <View style={{flex:1,borderBottomWidth:1,borderBottomColor:'#F4F5F5',paddingTop:20}}>
              <Text style={{fontSize:30,fontWeight:'500',borderBottomWidth:1,borderBottomColor:'#F4F5F5',paddingBottom:20}}>
                  Terms of Use and Privacy Policy
              </Text>

          </View>
          <View style={{flex:1,flexDirection:'column',paddingTop:20}}>
              <Paragraph style={styles.policyDetails}>
              Please read these terms and conditions prior to using the products and services 
              offered by Kabchef Labs Private Ltd. By using the product, you agree to be legally
               bound by the terms and conditions, privacy policy and terms of services 
               (including without limitations all disclaimers, exclusion of warranties and 
               limitations of liability contained therein). If you do not agree with these terms,
                please do not use the products and services offered by Kabchef Labs

              </Paragraph>
              <Text style={styles.title}>Terms of Use</Text>
              <Paragraph style={styles.policyDetails}>
            MyBusTime is not an official publication of Indian Railways
               or any public transport authority. Train timings and dynamically estimated 
               departures/arrivals may not match with actual timings. PNR status and seat 
               availability is actually provided by Indian Railways and Where is my Train just 
               acts as an interface to these services. Kabchef Labs is not responsible for any 
               damage caused by the information shown by this software. Please cross verify the information.

              </Paragraph>
              <Text style={styles.title}>Privacy Policy</Text>
              <Paragraph style={styles.policyDetails}>
              We collect following information when you use the software.
               Your mobile device’s hardware information, unique id, cell-towers
                to which the mobile is connected and the mobile location. 
                This information will be kept private by Kabchef Labs and its affiliates 
                and will not be disclosed to third parties other than service providers 
                that we use to help operate our products and services. We collect this 
                information to enable you and others to Spot trains and other location-based 
                services such as Alarm. However, Spot trains and Alarm are best-effort services
                 and we do not take responsibility concerning its accuracy. Please cross verify this information.

              </Paragraph>
            


              <Text style={styles.title}>Information Security</Text>
              <Paragraph style={styles.policyDetails}>
              We take appropriate security measures to protect against unauthorized access to or
               unauthorized alteration, disclosure or destruction of data. These include internal 
               reviews of our data collection, storage and processing practices and security measures,
                including appropriate encryption. Kabchef Labs Pvt. Ltd. shall make no guarantees for 
                the uninterrupted and continuous availability of the Products and/or Services or of
                 any specific feature(s) of the Products and/or Services. The Products and/or Services
                  are AS IS and are subject to the disclaimers of warranty and the limitations of liability
                   as found in this agreement and which are subject to testing by the Users before entering 
                   into this agreement. Kabchef Labs Pvt. Ltd. reserves the right to change or terminate
                    the Products and/or the Services.


                </Paragraph>

                <Text style={styles.title}>Changes to the Terms</Text>
              <Paragraph style={styles.policyDetails}>
              Kabchef may make changes to these Terms from time to time with or
               without notice. You understand and agree that if you use 
                the product and Services after the date on which these Terms have changed, Kabchef Labs
                 Pvt. Ltd. will treat your use as acceptance of the updated terms.
                  All the copyrights of this product are reserved with Kabchef

            </Paragraph>

          </View>

   
          
    </View>
</ScrollView>
        
  );
};


PrivacyPolicyScreen.navigationOptions = (navOpt) => {
    return {
        headerShown: false
    };
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
  },
  routesBody:{
    width:'99%',
    height:'auto',
    alignSelf:'center',
    backgroundColor:'#ffffff',
    borderRadius:5,

  },
  title:{
    fontSize:24,
    fontWeight:'400',
    paddingTop:20,
    paddingLeft:10,
  },
  policyDetails:{
      paddingTop:5,
      paddingBottom:20,
      paddingLeft:10,
     paddingRight:5,
     fontSize:16,


  }
});