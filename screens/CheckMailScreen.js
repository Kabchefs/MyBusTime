
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button} from 'react-native-paper';



export default function CheckMailScreen(props) {
 
    return (
        <View style={styles.container}>
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
                onPress={() => props.navigation.navigate({ routeName: "ResetPassword" })
            }
                >
                Go to Email
            
            </Button>
        
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
    headText:{
        color:'#1d2029',
        fontFamily:'Poppins-SemiBold',
        fontSize:20,
        textAlign:'center',
        marginTop:20,
    },
    detailText:{
        fontSize:14,
        fontFamily:"Poppins-Regular",
        fontWeight:'400',
        color:'#abb4bd',
        textAlign:'center',
        marginTop:20,
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
    image:{
        height: 151,
        width: 201,
        alignSelf:'center',
        marginTop:50,


    },
   
});
