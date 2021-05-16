
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput} from 'react-native-paper';



export default function ResetPasswordScreen() {
    const [email, setEmail] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.headText}>Reset Password</Text>         
            <Text style={styles.detailText}>{`Please enter your the new password and confirm\n the password`}</Text>

            <TextInput
                label="New Password"
                mode="flat"               
                style={styles.input}
                secureTextEntry={true}
                theme={{
                    colors: {
                    primary:'#abb4bd', }}}
                    
            />
           <TextInput
                label="Confirm New Password"
                mode="flat"               
                style={styles.input}
                secureTextEntry={true}
                theme={{
                    colors: {
                    primary:'#abb4bd', }}}
            />
            <Button
                mode="contained"
                style={styles.button}
                color={'#179de3'} uppercase={false}
                disabled={true}
                >
               <Text style={{color: '#ffffff',fontFamily:'Poppins-Medium'}}> Update</Text>
            </Button>
           
        
            

        </View>
    );
}

ResetPasswordScreen.navigationOptions = (navOpt) => {
    return {
      headerTitle: "Reset Password",
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
        fontFamily:"Poppins",
        fontWeight:'400',
        color:'#abb4bd',
        marginTop:20,
        marginLeft:30,       
    },
  
   
    input: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 18,
        backgroundColor: 'transparent',
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
   
    

});