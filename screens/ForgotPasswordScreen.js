
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image,ScrollView,ToastAndroid} from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import { instance } from '../utils/axiosConfig';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';


export default function ForgotPasswordScreen(props) {
    const [input, setInput] = useState('');
    const {t}=useTranslation();
    

    const handleInput=(e)=>{
        let obj={};
        const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(input)){
            obj.email=input;
        }else if(input.length ==10){
            obj.phone=input
        }
        instance.get('/users/reset',{params:obj}).then(res=>{
            if(res.status==200){
                props.navigation.navigate({routeName:'OTPVerify',params:{'data':obj}})
            }else if(res.status==201){
                ToastAndroid.show(res.data.message, ToastAndroid.LONG);
            }
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headText}><Trans i18nKey="FORGOT.FORGOT_PASSWORD">Forgot Password</Trans></Text>         
            <Text style={styles.detailText}>{t("FORGOT.FORGOT_DETAILS")}</Text>

            <TextInput
                label={t("FORGOT.EMAIL_MOBILE")}
                mode="flat"               
                style={styles.input}
                onChangeText={setInput}
                theme={{
                    colors: {
                    primary:'#abb4bd', }}}
            />
           
            <Button
                mode="contained"
                style={styles.button}
                color={'#179de3'} uppercase={false}
                onPress={handleInput}
                >
               <Text style={{color: '#ffffff'}}><Trans i18nKey="FORGOT.RECOVER_PASSWORD">Recover Password </Trans></Text>
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
      headerTitleStyle:{
        display:'none'
      }
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
        fontFamily:'Roboto-Regular',
        
    },
    
    button: {
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
