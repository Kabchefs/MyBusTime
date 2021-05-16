import React, { useState } from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { Button, TextInput} from 'react-native-paper';

export default function RegisterScreen(props) {
        const [email, setEmail] = useState('');
    const hasErrors = () => {
        return !email.includes('@');
      };
    return (
        <ScrollView style={styles.container}>
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
                keyboardType="email-address"
                style={styles.input}
                value={email} onChangeText={(email)=>setEmail(email)}
                theme={{
                    colors: {
                    primary:'#abb4bd', }}}
            />
             
             <TextInput
                label="Mobile Number"
                mode="flat"
                keyboardType="number-pad"
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
                style={styles.registerButton}
                color={'#179de3'} uppercase={false} onPress={() => props.navigation.navigate({ routeName: "CheckMail" })}>
                <Text style={{color: '#ffffff'}}>Register</Text>
            </Button>
            </ScrollView>
    )
}

RegisterScreen.navigationOptions = (navOpt) => {
    return {
      headerTitle: "Register",
      headeStyle: {
        textAlign: "center",
      },
      headerTitleAlign: "center",
    };
  };




const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor:'#ffffff'
    },
    headText:{
        color:'#1d2029',
        fontSize:24,
        fontWeight:'400',
        marginLeft:30,
        fontFamily:'Poppins',
    },
  
    button: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    input: {
        alignSelf:'center',
        marginTop: 10,
        backgroundColor: 'transparent',
        width: 315, 
        fontSize:14,
        fontFamily:'Poppins',
    },
    registerButton: {
        alignSelf:'center',
        marginTop: 30,
        marginBottom:30,
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
    }
});
