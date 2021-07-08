
import React, { useState } from 'react';
import { StyleSheet, Text, View,ScrollView,ToastAndroid} from 'react-native';
import { Button } from 'react-native-paper';

import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';
import { instance } from '../utils/axiosConfig';


const CELL_COUNT = 4;


export default function OTPVerifyScreen(props) {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const Verify=()=>{
        console.log(value);
        let obj=props.navigation.getParam('data');
        console.log(obj);
        if(value){
            obj.otp=value;
           instance.post('users/otp',obj).then(res=>{
               if(res.status==200){
                   if(res.data.result==true){
                       props.navigation.navigate({routeName:'ResetPassword',params:{'data':res.data.user}})
                   }
                   console.log(res.data)
               }else{
                ToastAndroid.show(res.data.message, ToastAndroid.LONG);
               }
           })
        }
        
    }

    const resendOtp=()=>{
        let obj=props.navigation.getParam('data');
        instance.get('/users/reset',{params:obj}).then(res=>{
            if(res.status==200){
                ToastAndroid.show('Otp resent! Check Mail', ToastAndroid.LONG);
            }else if(res.status==201){
                ToastAndroid.show(res.data.message, ToastAndroid.LONG);
            }
        }) 
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headText}>{`Enter 4 digit code sent\n to you at mail`}</Text>
            <CodeField
                ref={ref}
                {...propss}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        onLayout={getCellOnLayoutHandler(index)}
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell]}>
                        <Text style={styles.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                )}
            />


            <Button
                mode="contained"
                style={styles.verifyButton}
                onPress={Verify}
                color={'#179de3'} uppercase={false}>
                <Text style={{color: '#ffffff'}}>Verify</Text>
            </Button>
            <Text style={styles.verifyTxt}>Didn't recieve a verification code</Text>
            <View style={styles.buttonView}> 
            <Button style={{ marginTop:10,flex:1,marginLeft:30,marginRight:-65,fontFamily:'Roboto-Regular'}} onPress={resendOtp}  color={'#179de3'} uppercase={false}   >
               Resend Code{` |`}
            </Button>
            <Button style={{ marginTop:10,flex:1,marginRight:40,fontFamily:'Roboto-Regular'}}  color={'#179de3'} uppercase={false}  >
               Change Number
            </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor:'#ffffff'
    },
    headText: {
        color: '#1d2029',
        fontFamily: 'Roboto-Regular',
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 20,
        lineHeight:40,

    },

    button: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },


    verifyButton: {
        alignSelf:'center',
        marginTop: 50,
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

    verifyTxt:{             
        alignSelf:'center',
        marginTop:30,
        fontSize:14,
        fontFamily:'Roboto-Regular',
        color:'#abb4bd'

    },
    root: {padding: 20, minHeight: 300},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {
      marginTop: 20,
      width: 280,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    cellRoot: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
    },
    cellText: {
      color: '#000',
      fontSize: 20,
      textAlign: 'center',
    },
    focusCell: {
      borderBottomColor: '#007AFF',
      borderBottomWidth: 2,
    },
    buttonView:{
      
        flexDirection:'row',
    },
   

});
