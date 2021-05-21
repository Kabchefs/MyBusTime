
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Platform } from 'react-native';
import {Button} from 'react-native-paper';
import { SocialIcon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';




export default function ProfileScreen(props) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <ScrollView style={styles.container}>


            <View style={styles.head}>

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={styles.profileText}>Profile</Text>

                </View>


            </View>
            <View style={styles.firstCard}>
                <Button style={styles.editIcon} color={'#179de3'} icon="pencil"  onPress={pickImage}> </Button>
                {/* {image && <Image  style={styles.profileImage} source={{ uri: image }} />} */}
                
                <Image
                    style={styles.profileImage}
                    source={require("../assets/images/profile.png")}
                />

                <Text style={styles.name}>Ricardo Joseph</Text>
                <Text style={styles.name}>ricardojoseph@gmail.com</Text>

                <Text style={styles.rank}>RANK</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={styles.badge}>

                    </View>
                    <View style={styles.badge}>

                    </View>
                    <View style={styles.badge}>

                    </View>

                </View>
            </View>

            <View style={styles.secondCard}>
                <Text style={styles.share}>Share Us</Text>
                <View style={styles.socialButtonView}>
                    <SocialIcon
                        style={styles.socialButton}
                        type='facebook'
                    />

                    <SocialIcon
                        style={styles.socialButton}
                        type='twitter'
                    />
                    <SocialIcon
                        style={styles.socialButton}
                        type='instagram'
                    //iconColor={'#4c68d7'}
                    />

                </View>
            </View>


            <View style={styles.thirdCard}>
                <Text style={styles.general}>GENERAL</Text>
                <View style={styles.generalSetting}>
                    <Button style={styles.generalIcon} color={'#179de3'}  size={40} icon="security" >
                    </Button>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={styles.generalText}>Privacy</Text>
                        <Text style={styles.generalText2}>Change Your Password</Text>
                    </View>
                    <Button  style={styles.greaterIcon} color={'#dddddd'}   icon="greater-than" onPress={() => props.navigation.navigate({ routeName: "ResetPassword" })} />


                </View>
                <View style={styles.generalSetting}>
                    <Button style={styles.generalIcon}  color={'#179de3'} icon="information-outline">
                    </Button>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={styles.generalText}>About Us</Text>
                        <Text style={styles.generalText2}> Click to know more about us</Text>
                    </View>
                    <Button  style={styles.greaterIcon} color={'#dddddd'} icon="greater-than" />


                </View>
                <View style={styles.generalSetting}>
                    <Button style={styles.generalIcon} icon="star-outline" color={'#179de3'}>
                    </Button>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={styles.generalText}>Rate</Text>
                        <Text style={styles.generalText2}>Rate Us</Text>
                    </View>
                    <Button  style={styles.greaterIcon}  color={'#dddddd'}  icon="greater-than" />


                </View>

            </View>
           
           


        </ScrollView>
    );
}


ProfileScreen.navigationOptions = (navOpt) => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#ffffff',
        backgroundColor: '#f8f9f9',


    },
    head: {
        width: '100%',
        height: 298,
        backgroundColor: '#46b1e8',
        borderBottomRightRadius: 40,

    },
    profileText: {
        opacity: 0.90000004,
        width: 131,
        height: 28,
        color: '#ffffff',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        fontWeight: '400',
        lineHeight: 28,
        letterSpacing: 0.39,
        marginTop: 70,
        marginLeft: 30,
    },
    editIcon: {
        marginLeft: 130,



    },

    firstCard: {
        width: '90%',
        height: 300,
        backgroundColor: '#ffffff',
        marginTop: -170,
        alignSelf: 'center',
        borderTopLeftRadius: 15,
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        marginBottom: 10,

    },
    profileImage: {
        marginTop: -20,
        height: 100,
        width: 100,
        marginLeft: "auto",
        marginRight: "auto",
        borderWidth: 1,
        borderColor: '#ffffff',



    },
    name: {
        color: '#042c5c',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0.4,
        alignSelf: 'center',
        marginTop: 7,

    },
    socialButtonView: {
        flex: 1,
        flexDirection: 'row',
        width: 296,
        height: 80,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -25


    },
    socialButton: {
        marginLeft: 35,
        marginTop: 20,
    },
    secondCard: {
        width: '90%',
        height: 132,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        marginBottom: 10,
    },
    rank: {
        width: 36,
        height: 17,
        color: '#179de3',
        fontFamily: "Poppins",
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 17,
        letterSpacing: 0.625,
        marginLeft: 10,
        marginTop: 10,
    },
    badge: {
        marginTop: 5,
        width: 69,
        height: 75,
        borderRadius: 12,
        backgroundColor: '#f8f9f9',
        marginLeft: 30,

    },
    update: {
        width: 60,
        height: 16,
        color: '#179de3',
        fontFamily: 'Poppins',
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 1.25,
        marginLeft: 238,
        marginBottom: 5,
    },
    share: {

        height: 17,
        color: '#179de3',
        fontFamily: "Poppins",
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 17,
        letterSpacing: 0.625,
        marginLeft: 15,
        marginTop: 15,

    },

    thirdCard: {
        flex: 1,
        flexDirection: 'column',

    },
    general: {
        width: 58,
        height: 17,
        color: '#179de3',
        fontFamily: 'Poppins',
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 17,
        letterSpacing: 0.625,
        marginLeft: 25,
        marginTop: 10,
        marginBottom: 10,
    },
    generalSetting: {
        width: '90%',
        height: 60,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    generalIcon: {

       height: 45,
        borderRadius: 8,
        backgroundColor: '#dfe7f5',
        alignSelf: 'center',
        marginRight: 10,
        marginLeft: 10,
        paddingLeft:10,
       justifyContent:'center',

    },
    generalText: {
        marginTop: 10,
        marginLeft: 12,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,


    },
    generalText2: {
        marginTop: 3,
        marginLeft: 10,
        fontFamily: 'Montserrat-Regular',
        fontSize: 11,

    },
    greaterIcon:{
       
        alignItems:'center',
        justifyContent:'center',
        

    }




});
