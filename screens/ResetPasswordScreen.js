
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput} from 'react-native-paper';



export default function ResetPasswordScreen() {
    const [email, setEmail] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.headText}>Reset Password</Text>         
            <Text style={styles.detailText}>Please enter your the new password and confirm the password</Text>

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
                style={styles.updateButton}
                color={'#179de3'} uppercase={false}
                
                >
               <Text style={{color: '#ffffff'}}> Update</Text>
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
        paddingTop: 10,
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
        marginTop:20,
        marginLeft:30,  
        lineHeight:19,     
    },
  
   
    input: {
        alignSelf:'center',
        marginTop: 20,
        backgroundColor: 'transparent',
        width: 315, 
        fontSize:14,
        fontFamily:'Poppins',
    },
    
    updateButton: {
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
   
    

});
