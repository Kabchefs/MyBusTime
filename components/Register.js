
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, TextInput} from 'react-native-paper';



export default function Register({ navigation: { navigate } }) {
    const [email, setEmail] = useState('');
    const hasErrors = () => {
        return !email.includes('@');
      };
    return (
        <View style={styles.container}>
            <Text style={styles.headText}>Register to MBT</Text>         

            <TextInput
                label="Full Name"
                mode="flat"
               
               
                style={styles.input}
                theme={{
                    colors: {
                    primary:'#abb4bd', }}}
            />
            <TextInput
                label="Email"
                mode="flat"
                style={styles.input}
                value={email} onChangeText={(email)=>setEmail(email)}
                theme={{
                    colors: {
                    primary:'#abb4bd', }}}
            />
             
             <TextInput
                label="Mobile Number"
                mode="flat"
                theme={{
                    colors: {
                    primary:'#abb4bd', }}}
               
                style={styles.input}
                />
            <TextInput
                label="Password"
                mode="flat"
                secureTextEntry={true}
                style={styles.input}
                theme={{
                    colors: {
                    primary:'#abb4bd', }}}
            />
            <TextInput
                label="Confirm Password"
                mode="flat"
                secureTextEntry={true}
                style={styles.input}
                theme={{
                    colors: {
                    primary:'#abb4bd', }}}
            />
        
            <Button
                mode="contained"
                style={styles.register}
                color={'#179de3'} uppercase={false} onPress={() => navigate('OTP Verfiy')}>
                <Text style={styles.registerText}>Register</Text>
            </Button>
            <Text></Text>

        
            

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50
    },
    headText:{
        color:'#1d2029',
        fontFamily:'Poppins-Bold',
        fontSize:22,
        fontWeight:'bold',
        marginLeft:14,
        marginTop:35,
   

    },
  
    button: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    input: {
        marginLeft: 25,
        marginRight: 25,
        marginTop: 10,
        backgroundColor: 'transparent',
        width: 315,

       
    },
    
    register: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        width: 315,
        height: 46,
        borderRadius:5,
    },
    registerText:{ 
        width: 37,
        height: 21,
        color: '#ffffff',
        fontFamily: 'Poppins',
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 3,
        textAlign: 'center',
    }

});
