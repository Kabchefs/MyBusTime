
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, TextInput} from 'react-native-paper';



export default function ForgotPasswordScreen(props) {
    const [email, setEmail] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.headText}>Forgot Password</Text>         
            <Text style={styles.detailText}>{`Please enter your registered email or mobile\n to reset your password`}</Text>

            <TextInput
                label="Email / Mobile Number"
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
                onPress={() => props.navigation.navigate({ routeName: "CheckMail" })
                }>
                Recover Password
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
        paddingTop: 50
    },
    headText:{
        color:'#1d2029',
        fontFamily:'Poppins-Bold',
        fontSize:24,
        marginLeft:30,
        marginTop:30,
   

    },
    detailText:{
        fontSize:14,
        fontFamily:"Poppins-Regular",
        fontWeight:'400',
        color:'#abb4bd',
        marginTop:20,
        marginLeft:30,       
    },
  
   
    input: {
        marginLeft: 25,
        marginRight: 25,
        marginTop: 30,
        backgroundColor: 'transparent',
        width: 315, 
        fontSize:12,
        fontFamily:'Poppins-Regular',
    },
    
    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 60,
        width: 315,
        height: 55,
        borderRadius:5,
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        justifyContent:'center',
        textAlign:'center',
    },
   
    image:{
        height: 150,
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop:50,

    },
    imageText:{
        marginTop:-30,
        width: 139,
        height: 34,
        color: '#179de3',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 22,
        fontWeight: '400',
        lineHeight: 29,
        textAlign: 'center',
        marginLeft:'auto',
        marginRight:'auto',
    }

});
