import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, TouchableHighlight, StatusBar, Button, CheckBox } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTheme, Avatar, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { useTranslation,Trans } from 'react-i18next';


export const langFun=()=>{


}

export default function ContentComponent(props) {

    const [egSelected, setEgSelection] = useState(true);
    const [hiSelected, setHiSelection] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

    const { t, i18n } = useTranslation();

    const toggleModal = () => {
        console.log("toggle");
       
        //return LangModal;
        if(egSelected)
        i18n.changeLanguage("en");
        if(hiSelected)
        i18n.changeLanguage("hi");
         setModalVisible(!isModalVisible);
     //    debugger 

    };


    const signout = () => {
        AsyncStorage.removeItem('user');
        props.navigation.navigate({ routeName: 'Login' })

    }
    const handleLanguageChange=()=>{
        setEgSelection(!egSelected);
        setHiSelection(!hiSelected);

        

    }

    return (
        <TouchableOpacity activeOpacity={1} style={styles.drawerTransparent}>
            <ScrollView >
                <SafeAreaView style={styles.droidSafeArea}>
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={require('../assets/images/busLogo.png')}
                                color={'white'}
                                size={65}
                                backgroundColor={'white'}

                            />

                            <View style={{ marginLeft: 15, marginTop: 8, flexDirection: 'column' }}>
                                <Title style={styles.title}>MyBusTime</Title>
                            </View>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    {/* <TouchableHighlight underlayColor={'rgba(0,0,0.2)'} onPress={()=>props.navigation.navigate({routeName:'Home'})}>
                 <View style={styles.row}>
                 <MaterialCommunityIcons name="home" size={24} color='rgb(23, 157, 227)' />
                 <Text style={styles.text}>Home</Text>
                 </View>
             </TouchableHighlight> */}



                    <TouchableHighlight underlayColor={'rgba(0,0,0.2)'} onPress={() => props.navigation.navigate({ routeName: 'Connect' })}>
                        <View style={styles.row}>
                            <MaterialCommunityIcons name="comment-search" size={22} color="rgb(23, 157, 227)" />
                            <Text style={styles.text}>{t("CONNECT.CONNECT")}</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={'rgba(0,0,0.2)'} onPress={() => props.navigation.navigate({ routeName: 'Profile' })}>
                        <View style={styles.row}>
                            <MaterialCommunityIcons name="account" size={22} color="rgb(23, 157, 227)" />
                            <Text style={styles.text}>{t("PROFILE.PROFILE")}</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={'rgba(0,0,0.2)'} onPress={() => props.navigation.navigate({ routeName: 'PrivacyPolicy' })}>
                        <View style={styles.row}>
                            <MaterialCommunityIcons name="information" size={24} color="rgb(23, 157, 227)" />
                            <Text style={styles.text}>{t("POLICY.PRIVACY_POLICY")}</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={'rgba(0,0,0.2)'} onPress={() => toggleModal()}>
                        <View style={styles.row}>
                            <MaterialIcons name="language" size={24} color="rgb(23, 157, 227)" />
                            <Text style={styles.text}>{t("LANGUAGE.LANGUAGE")}</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={'rgba(0,0,0.2)'} onPress={() => props.navigation.navigate({ routeName: 'ResetPassword' })}>
                        <View style={styles.row}>
                            <MaterialCommunityIcons name="security" size={22} color="rgb(23, 157, 227)" />
                            <Text style={styles.text}>{t("RESET.RESET_PASSWORD")}</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={'rgba(0,0,0.2)'} onPress={() => signout()}>
                        <View style={styles.bottomSection}>
                            <MaterialCommunityIcons name="exit-to-app" size={22} color="rgb(23, 157, 227)" />
                            <Text style={styles.text} >{t("LOGIN.SIGN_OUT")}</Text>
                        </View>
                    </TouchableHighlight>

                    <Text style={{ paddingLeft: 60, paddingTop: 30, fontFamily: 'Roboto-Regular', fontSize: 16 }}>@Kabchef 2021</Text>


                </SafeAreaView>

                <Modal isVisible={isModalVisible}>
                    <View style={{ backgroundColor: 'white', height: 'auto', width: '80%', alignSelf: 'center' }}>

                        <Text style={styles.textHead}>{(t("LANGUAGE.CHOOSE_LANGUAGE"))}</Text>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row',paddingTop:15 }}>
                                <CheckBox
                                    value={egSelected}
                                    onValueChange={handleLanguageChange}
                                // onPress={}
                                    style={styles.checkbox}
                                  
                                />
                                <Text style={styles.lang}>{(t("LANGUAGE.ENGLISH"))}</Text>
                            </View>
                            <View style={{ flexDirection: 'row',paddingBottom:15 }}>
                                <CheckBox
                                    value={hiSelected}
                                    onValueChange={handleLanguageChange}
                                 
                                  //  onClick={handleLanguageChange(1)}
                                    style={styles.checkbox}
                                    color={'rgbb(23,157,227)'}
                                    
                                />
                                <Text style={styles.lang}>{(t("LANGUAGE.HINDI"))}</Text>
                            </View>
                        </View>




                        <Text style={styles.textHead} onPress={toggleModal}>{t("LANGUAGE.SUBMIT")}</Text>

                        {/* <Button title="Submit" onPress={toggleModal} /> */}
                    </View>
                </Modal>

            </ScrollView>
        </TouchableOpacity>


    );

}
const styles = StyleSheet.create({

    drawerTransparent: {
        flex: 1,
        backgroundColor: 'transparent',

    },
    header: {
        paddingLeft: 20,
        paddingTop: 50,
        //  backgroundColor:'rgb(23, 157, 227)',
        backgroundColor: 'rgb(23, 157, 227)',
        paddingBottom: 30
    },
    title: {
        fontSize: 18,
        marginTop: 3,
        fontFamily: 'Roboto-Regular',
        color: '#ffffff'
    },
    line: {
        width: '100%',
        alignSelf: 'center',
        height: 1,
        // backgroundColor:'gray',
        borderTopColor: '#f4f4f4',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingLeft: 30
    },
    text: {
        fontSize: 16,
        marginLeft: 20,
        fontFamily: 'Roboto-Regular',

    },
    bottomSection: {
        flexDirection: 'row',
        paddingVertical: 25,
        paddingLeft: 30,
        // paddingTop:'90%',
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    droidSafeArea: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    textHead: {
        backgroundColor: 'rgb(23, 157, 227)',
        textAlign: 'center',
        fontFamily: 'Robot-Regular',
        fontSize: 16,
        color: 'white',
        paddingTop: 10,
        paddingBottom: 10,

    },
    checkbox: {
        marginLeft: 10,
        borderRadius: 50,



    },
    lang: {
        paddingTop: 5,
        fontSize: 15,
        fontFamily: 'Robot-Regular',
        paddingLeft: 10


    }

})