
import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Button} from 'react-native-paper';

import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';


const CELL_COUNT = 4;


export default function CheckMailScreen(props) {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    // const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    //     value,
    //     setValue,
    // });
    return (
        <View style={styles.container}>
            <Text style={styles.headText}>{`Enter 4 digit code sent\n to you at 9878437467`}</Text>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                       // onLayout={getCellOnLayoutHandler(index)}
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
                style={styles.button}
                color={'#179de3'} uppercase={false} 
                onPress={() => props.navigation.navigate({ routeName: "ResetPassword" })
            }
                >
               <Text style={styles.verifyText}>Verify </Text>
            </Button>

            <Text style={styles.verifyInfo}>Didn't recieve a verification code</Text>
            <Text style={{ marginTop:10,textAlign:'center',color:'#179de3',fontFamily:'Poppins',fontSize:14}}>
               Resend Code
            </Text>
          
        </View>
    );
}

CheckMailScreen.navigationOptions = (navOpt) => {
    return {
      headerTitle: "Check Email",
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
    headText: {
        color: '#1d2029',
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        fontWeight: '400',
        lineHeight:40,
        textAlign: 'center',
        marginTop: 20,
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

   
    verifyText: {
        width: 37,
        height: 21,
        color: '#ffffff',
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 3,
        textAlign: 'center',
    },
    verifyInfo:{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop:30,
        fontSize:14,
        fontFamily:'Poppins',
        color:'#abb4bd',



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
