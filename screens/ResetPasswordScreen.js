
import React, { useState } from 'react';
import { StyleSheet, Text, View,ToastAndroid,Alert } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import { instance } from '../utils/axiosConfig';
import { Trans,useTranslation } from 'react-i18next';



export default function ResetPasswordScreen(props) {
    const {t}=useTranslation();
    const [password, setPass] = useState('');
    const [cpass,setCpass]=useState('');

    const resetPass=()=>{
        if(cpass==password){
            let obj=props.navigation.getParam('data');
            let a={
                email:obj.email,
                password:cpass
            }
                instance.post('/users/pass',a).then(res=>{
                    if(res.status==200){
                        Alert.alert(
                            "Sucess!",
                            "Password changed sucessfully! Go to Login",
                            [{ text: "Okay", style: "destructive",onPress:()=>props.navigation.navigate({routeName:'Login'})}]
                          );
                    }else{
                        ToastAndroid.show('Something Went Wrong! Try Again', ToastAndroid.LONG);
                    }
                })
        }else{
            Alert.alert(
                "Invalid Input!",
                "Password and Confirm password must be same!",
                [{ text: "Okay", style: "destructive" }]
              );
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.headText}><Trans i18nKey="RESET.RESET_PASSWORD">Reset Password</Trans></Text>         
            <Text style={styles.detailText}><Trans i18nKey="RESET.RESET_DETAILS">Please enter your the new password and confirm the password</Trans></Text>

            <TextInput
                label={<Trans i18nKey="RESET.NEW_PASSWORD">New Password</Trans>}
                mode="flat"               
                style={styles.input}
                secureTextEntry={true}
                onChangeText={setPass}
                theme={{
                    colors: {
                    primary:'#abb4bd', }}}
                    
            />
           <TextInput
                label={<Trans i18nKey="RESET.CONFIRM_PASSWORD">Confirm New Password</Trans>}
                mode="flat"               
                style={styles.input}
                secureTextEntry={true}
                onChangeText={setCpass}
                theme={{
                    colors: {
                    primary:'#abb4bd', }}}
            />
            <Button
                mode="contained"
                style={styles.updateButton}
                color={'#179de3'} uppercase={false}
                onPress={resetPass}
                >
               <Text style={{color: '#ffffff'}}><Trans i18nKey="RESET.UPDATE">Update</Trans></Text>
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
        fontFamily:'Roboto-Regular',
        fontSize:24,
        marginLeft:30,
        fontWeight:'400',

   

    },
    detailText:{
        fontSize:14,
        fontFamily:"Roboto-Regular",
        fontWeight:'400',
        color:'#abb4bd',
        marginTop:20,
        paddingLeft:30,  
        lineHeight:19,     
        paddingRight:10,
    },
  
   
    input: {
        alignSelf:'center',
        marginTop: 20,
        backgroundColor: 'transparent',
        width: 315, 
        fontSize:14,
        fontFamily:'Roboto-Regular',
    },
    
    updateButton: {
        alignSelf:'center',
        marginTop: 60,
        width: 315,
        height: 55,
        borderRadius:5,
        fontFamily: 'Roboto-Regular',
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
