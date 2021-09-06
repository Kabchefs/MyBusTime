import React, { useState } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { useTranslation, Trans } from 'react-i18next';
import { Button } from 'react-native-paper';
import ContentComponent from '../navigation/ContentComponent';
import { Touchable } from 'react-native';


export default function LanguageScreen(props) {
    const [egSelected, setEgSelection] = useState(true);
    const [hiSelected, setHiSelection] = useState(false);
    const { t, i18n } = useTranslation();
    const [isEnglishPress,setIsEnglishPress]=useState(true);
    
    const [isHindiPress,setIsHindiPress]=useState(false);


    // const handleContinue = () => {
    //     console.log("toggle");

    //     if (egSelected)
    //         i18n.changeLanguage("hi");
    //     if (hiSelected)
    //         i18n.changeLanguage("eg");
    //     props.navigation.navigate('Login');
    //     return;

    // };


    const handleLanguage = () => {
        setIsEnglishPress(!isEnglishPress);
        setIsHindiPress(!isHindiPress);
        setEgSelection(!egSelected);
        setHiSelection(!hiSelected);
        if (egSelected)
        i18n.changeLanguage("hi");
    else if (hiSelected)
        i18n.changeLanguage("eg");
    props.navigation.navigate('Login');
    return;

    }
    return (
        <View style={styles.container}>

            <View style={styles.head}>
            <Image
                style={styles.image}
                source={
                    require('../assets/images/busLogo.png')
                }
            />
            </View>
            <View style={styles.logoView}>
        <Text style={styles.logoText}>MyBusTime</Text>
      </View>
            <Text style={styles.langText}>Choose Your Language</Text>
            {/* <View style={{borderBottomWidth:1,paddingTop:10,width:'90%',alignSelf:'center'}}></View> */}
            <Text style={{fontSize:18,fontFamily:'Roboto-Regular',alignSelf:'center',paddingTop:10,justifyContent:'center'}}>कृपया अपनी भाषा चुनें</Text>

            <View style={{ flexDirection: 'row', paddingTop: 100, alignSelf: 'center' }}>
                <TouchableOpacity onPress={handleLanguage}>
                <View style={[styles.btn,{backgroundColor:isEnglishPress?'rgb(23, 157, 227)':'#abb4bd'}]} >
                    <Text style={{color:isEnglishPress?'white':'black',alignSelf:'center',fontSize:16,fontFamily:'Roboto-Regular'}}>English</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLanguage}>
                <View style={[styles.btn,{backgroundColor:isHindiPress?'rgb(23, 157, 227)':"#abb4bd"}]} onclick={handleLanguage}>
                    <Text style={{color:isHindiPress?'white':'black',alignSelf:'center',fontSize:16,fontFamily:'Roboto-Regular'}}> हिंदी</Text>
                </View>
                </TouchableOpacity>

                {/* <Button style={[styles.button]} contentStyle={{backgroundColor:isEnglishPress?'rgb(23, 157, 227)':'white',width:isEnglishPress?150:120,height:isEnglishPress?50:38}} labelStyle={{color:isEnglishPress?'white':'rgb(23, 157, 227)'}} uppercase={false} mode="outlined" onPress={handleLanguage} color={'rgb(23, 157, 227)'}>
                    English
                </Button>
                <Button style={styles.button} uppercase={false} contentStyle={{backgroundColor:isHindiPress?'rgb(23, 157, 227)':'white',width:isHindiPress?150:120,height:isHindiPress?50:38}} labelStyle={{color:isHindiPress?'white':'rgb(23, 157, 227)'}} mode="outlined" onPress={ handleLanguage} color={'rgb(23, 157, 227)'}>
                    हिंदी
                </Button> */}

            </View>
            {/* <View style={{position:'relative',marginTop:20}}>
            <Button style={styles.submit} labelStyle={{fontSize:16,fontFamily:'Roboto-Regular'}} mode="contained" uppercase={false} onPress={ handleContinue}>
            Conitnue
            </Button>
            </View> */}

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
      

    },
    headText: {
        fontSize: 20,
        fontFamily: "Roboto-Regular",
        color: '#ffffff',
        alignSelf: 'center'


    },
    langText: {
        fontSize: 22,
        fontFamily: "Roboto-Regular",
        paddingTop: -30,
        marginTop:-5,
        alignSelf:'center',
        fontWeight:'bold'
      
    },
    button: {
        width: 150,
        height: 50,
        color: 'rgb(23, 157, 227)',
        alignSelf:'center',
        borderRadius: 10,
        fontSize: 40,
        justifyContent:'center',
        marginRight:10,
        marginLeft:10
    },
    btn:{
        width: 150,
        height: 70,
        color: 'rgb(23, 157, 227)',
        alignSelf:'center',
        borderRadius: 10,
        fontSize: 40,
        justifyContent:'center',
        marginRight:10,
        marginLeft:10,
        borderWidth:1,
        borderColor:"#abb4bd",
        

    },
    
    submit:{
        width:'40%',
        alignSelf:'center',
        padding:8,
        backgroundColor:'black',
        fontSize:30,
        borderRadius:10,
        marginLeft:'42%',
      

    },image:{
        height: 200,
        width: 200,
        alignSelf:'center'
    },
    logoView: {
        margin: 10,
        paddingTop: 20,
        alignItems: "center",
        textAlign: "center",
      },
      logoText: {
        marginTop: -70,
        width: 139,
        height: 34,
        color: "#179de3",
        fontFamily: "Montserrat-SemiBold",
        fontSize: 22,
        textAlign: "center",
      },
})