
import React from 'react';
import { StyleSheet, Text, View, Image,ScrollView } from 'react-native';
import { Button} from 'react-native-paper';



export default function CheckMailScreen(props) {
 
    return (
        <ScrollView style={styles.container}>
             <Image
                style={styles.image}
                source={
                    require('../assets/images/email.png')
                }
            />
            <Text style={styles.headText}>Check Your Email</Text> 
            <Text style={styles.detailText}>{`We have sent you a reset password link\n on your registered email address.`}</Text>        

            <Button
                mode="contained"
                style={styles.button}
                color={'#179de3'} uppercase={false} 
                onPress={() => props.navigation.navigate({ routeName: "ResetPassword" })}
                >
            <Text style={{color: '#ffffff'}}>Go to Email</Text>
            
            </Button>
        
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
    headText:{
        color:'#1d2029',
        fontFamily:'Poppins',
        fontSize:24,
        textAlign:'center',
        marginTop:20,
        fontWeight:'400',
    },
    detailText:{
        fontSize:14,
        fontFamily:"Poppins",
        fontWeight:'400',
        color:'#abb4bd',
        textAlign:'center',
        marginTop:20,
        lineHeight:22,
    },
  
    button: {
        alignSelf:'center',
        marginTop: 55,
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
    image:{
        height: 151,
        width: 201,
        alignSelf:'center',
        marginTop:50,


    },
   
});
