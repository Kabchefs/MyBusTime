
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, TextInput} from 'react-native-paper';


export default function Login() {
    const [email, setEmail] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.image}>
            <Image
                style={styles.logo}
                source={
                    require('../assets/busLogo.png')
                }
            />
            <Text style={styles.logoText}>MyBusTime</Text>
            </View>
            


            <View style={styles.button}>

                <Button style={styles.socialButton} icon="facebook" uppercase={false} mode="outlined"  color={'#1d2029'}>
                    <Text style={styles.socialText}>Facebook</Text>
            </Button>
                <Button style={styles.socialButton} icon="google" uppercase={false} mode="outlined"  color={'#1d2029'}>
                <Text style={styles.socialText}>Google</Text>
            </Button>
            </View>
            <Text style={styles.orText}>or</Text>

            <TextInput
                label="Email ID"
                mode="flat"
                value={email}
                onChangeText={email => setEmail(email)}
                style={styles.input}
            />
            <TextInput
                label="Password"
                mode="flat"
                secureTextEntry={true}
                style={styles.input}
               

            />
            <Button style={styles.forgot} uppercase={false} color={'#179de3'}>
                Forgot Password?
            </Button>
            <Button
                mode="contained"
                style={styles.login}
                color={'#179de3'} uppercase={false}>
                <Text style={styles.loginText}>Login</Text>
         </Button>
            <Button style={styles.register}  color={'#179de3'} uppercase={false}  onPress={()=>props.navigation.replace("signup")}>
                Don't have an account? Register Now
            </Button>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50
    },
    logo: {
        height: '137px',
        width: '137px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
       
    },
    logoText:{
        marginTop:1,
        width: '139px',
        height: '34px',
        color: '#179de3',
        fontFamily: 'Poppins',
        fontSize: 21,
        fontWeight: '600',
        lineHeight: 4,
        textAlign: 'center',
        marginLeft:'auto',
        marginRight:'auto',
    },
    image:{
        flex:1,

    },
    orText:{
            width: '14px',
            height: '20px',
            color: '#abb4bd',
            fontFamily: 'Poppins',
            fontSize: 15,
            fontWeight: '400',
            lineHeight: 4,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop:20,
          
          

    },
    forgot: {
        marginTop:10,
        marginLeft: 150,
        fontFamily: 'Poppins',
        fontSize: 10,
        fontWeight: 400,
        lineHeight:2,
    },
    register: {
        marginTop: 10,
        fontSize: 6,
        marginTop:12,


    },
    button: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    input: {
        marginLeft: 18,
        marginRight: 18,
        marginTop: 18,
        backgroundColor: 'transparent',
       
    },
    socialButton: {
        flex: 1,
        padding: 7,
        margin: 15,
        width: '145px',
        height: '45px',
        borderRadius: '4px',
        
    },
    
     socialText:{
         width: '39px',
         height: '12px',
         color: '#1d2029',
         fontFamily: 'Poppins',
         fontSize: 13,
         fontWeight: '400',
         lineHeight: 2,

     },

    login: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 18,
        width: '315px',
        height: '46px',
        borderRadius:'4px',
    },
    loginText:{ 
        width: '37px',
        height: '21px',
        color: '#ffffff',
        fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 3,
       
        
        

    }

});
