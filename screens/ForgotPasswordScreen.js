
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image,ScrollView} from 'react-native';
import { Button, TextInput} from 'react-native-paper';



export default function ForgotPasswordScreen(props) {
    const [email, setEmail] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.headText}>Forgot Password</Text>         
            <Text style={styles.detailText}>{`Please enter your registered email \n to reset your password`}</Text>

            <TextInput
                label="Email"
                mode="flat"               
                style={styles.input}
                theme={{
                    colors: {
                    primary:'#abb4bd', }}}
            />
           
            <Button
                mode="contained"
                style={styles.button}
                color={'#179de3'} uppercase={false}
                onPress={() => props.navigation.navigate({ routeName: "OTPVerify" })}
                >
               <Text style={{color: '#ffffff'}}>Recover Password </Text>
            </Button>
            <Image
                style={styles.image}
                source={
                    require('../assets/images/busLogo.png')
                }
            />
             <Text style={styles.imageText}>MyBusTime</Text>

        
            

        </View>
    );
}

ForgotPasswordScreen.navigationOptions = (navOpt) => {
    return {

      headerTitle: "Forgot Password",
      headeStyle: {
        textAlign: "center",
        
      },
      headerTitleAlign: "center",
    };
  };

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop:10,
        backgroundColor:'#ffffff'
    },
    headText:{
        color:'#1d2029',
        fontFamily:'Poppins',
        fontSize:24,
        marginLeft:30,
        fontWeight:'400',

   

    },
    detailText:{
        fontSize:14,
        fontFamily:"Poppins",
        fontWeight:'400',
        color:'#abb4bd',
        marginTop:10,
        marginLeft:30,  
        lineHeight:19,     
    },
  
   
    input: {
       // marginLeft: 25,
        //marginRight: 25,
        alignSelf:'center',
        marginTop: 30,
        backgroundColor: 'transparent',
        width: 315, 
        fontSize:14,
        fontFamily:'Poppins',
        
    },
    
    button: {
        alignSelf:'center',
        marginTop: 60,
        width: 315,
        height: 55,
        borderRadius:5,
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        justifyContent:'center',
        textAlign:'center',
        shadowColor: 'rgba(255, 22, 84, 0.25)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
    
        
    },
   
    image:{
        height: 150,
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    imageText:{
        marginTop:-30,
        width: 139,
        height: 34,
        color: '#179de3',
        fontFamily: "Montserrat-SemiBold",
        fontSize: 22,
        textAlign: 'center',
        marginLeft:'auto',
        marginRight:'auto',
        
    }

});
