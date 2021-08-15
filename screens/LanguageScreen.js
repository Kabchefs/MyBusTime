import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation, Trans } from 'react-i18next';
import { Button } from 'react-native-paper';


export default function LanguageScreen(props) {
    const [egSelected, setEgSelection] = useState(true);
    const [hiSelected, setHiSelection] = useState(false);
    const { t, i18n } = useTranslation();
    const [isEnglishPress,setIsEnglishPress]=useState(true);
    
    const [isHindiPress,setIsHindiPress]=useState(false);


    const handleContinue = () => {
        console.log("toggle");

        if (egSelected)
            i18n.changeLanguage("en");
        if (hiSelected)
            i18n.changeLanguage("hi");
        props.navigation.navigate('Login');
        return;

    };


    const handleLanguage = () => {
        setIsEnglishPress(!isEnglishPress);
        setIsHindiPress(!isHindiPress);
        setEgSelection(!egSelected);
        setHiSelection(!hiSelected);

    }
    return (
        <View style={styles.container}>

            <View style={styles.head}>
                <Text style={styles.headText}>MyBusTime</Text>
            </View>
            <Text style={styles.langText}>Choose Your Language</Text>

            <View style={{ flexDirection: 'column', paddingTop: 80, alignSelf: 'center' }}>

                <Button style={[styles.button]} contentStyle={{backgroundColor:isEnglishPress?'rgb(23, 157, 227)':'white'}} labelStyle={{color:isEnglishPress?'white':'rgb(23, 157, 227)'}} uppercase={false} mode="outlined" onPress={handleLanguage} color={'rgb(23, 157, 227)'}>
                    English
                </Button>
                <Button style={styles.button} uppercase={false} contentStyle={{backgroundColor:isHindiPress?'rgb(23, 157, 227)':'white'}} labelStyle={{color:isHindiPress?'white':'rgb(23, 157, 227)'}} mode="outlined" onPress={ handleLanguage} color={'rgb(23, 157, 227)'}>
                    हिंदी
                </Button>

            </View>
            <View style={{position:'relative',marginTop:'auto'}}>
            <Button style={styles.submit} labelStyle={{fontSize:16,fontFamily:'Roboto-Regular'}} mode="contained" uppercase={false} onPress={ handleContinue}>
            Conitnue
            </Button>
            </View>

        </View>


    );
}
LanguageScreen.navigationOptions = (navOpt) => {

    return {
      headerShown: false,
    
    };
  };
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 50
    },
    head: {

        flexDirection: 'column',
        backgroundColor: 'rgb(23, 157, 227)',
        width: '100%',
        padding: 12,

    },
    headText: {
        fontSize: 20,
        fontFamily: "Roboto-Regular",
        color: '#ffffff',
        alignSelf: 'center'


    },
    langText: {
        fontSize: 20,
        fontFamily: "Roboto-Regular",
        paddingTop: 40,
        alignSelf: 'center',
    },
    button: {
        width: 120,
        height: 38,
        color: 'rgb(23, 157, 227)',
        marginTop: 10,
        borderRadius: 10,
        fontSize: 40


    },
    submit:{
      
        
        width:'99%',
        alignSelf:'center',
        padding:8,
        backgroundColor:'rgb(23, 157, 227)',
        fontSize:30,
      

    }

})