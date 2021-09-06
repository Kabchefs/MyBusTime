
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Platform,Linking,TouchableOpacity } from 'react-native';
import {Button,Appbar} from 'react-native-paper';
import { SocialIcon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';
import { instance } from '../utils/axiosConfig';
import { Trans,useTranslation } from 'react-i18next';

export default function ProfileScreen(props) {
    const {t}=useTranslation();
    const TopNavBar = () =>
    {
    
      return (
        <Appbar.Header 
        style={{ backgroundColor: 'rgb(23, 157, 227)' }}
        >
    
        <Appbar.Action onPress={()=>props.navigation.toggleDrawer()} icon={() => <MaterialCommunityIcons name="format-align-left" size={24}  color="white"/>} />
    
           <Appbar.Content title="MyBusTime"  titleStyle={{fontFamily:'Roboto-Regular'}}/>
         </Appbar.Header>
    
    
      );
    };
    
    const [image, setImage] = useState(null);
    const [user,setUser]=useState({});
    const [ranks,setRanks]=useState([]);
    const [r,sr]=useState();
    const [rank,setr]=useState();
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




    
    useEffect(() => {
  AsyncStorage.getItem('user').then(data=>JSON.parse(data)).then(res=>{
      console.log(res)
      setUser(res);
  });
}, [])

useEffect(()=>{
    instance.get(`/rank?user=${user._id}`).then(res=>{
      if(res.status==200){
        let ranks=res.data.result;
        ranks=ranks.sort((a, b) => {
          return a?.total_count - b?.total_count;
      });
console.log("ranks jiiii",ranks);
        setRanks(ranks);
        getRank();
      }
    })
  },[user])

  const getRank=()=>{
      console.log("get rank called");
      if(ranks.length>0){
          for(let i=0;i<ranks.length;i++){
              if(ranks[i].user._id==user._id){
                  sr(ranks[i].total_count);
                  setr(i+1);
              }
          }
      }
  }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={{flex:1}}>
      
            <TopNavBar/>
            <ScrollView style={styles.container}>

            <View style={styles.head}>

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={styles.profileText}><Trans i18nKey="PROFILE.PROFILE">Profile</Trans></Text>

                </View>


            </View>
            <View style={styles.firstCard}>
                <Image
                    style={styles.profileImage}
                    source={image==null? require("../assets/images/profile.png"):{uri:image}}
                />
                
                <MaterialCommunityIcons name="pencil" size={25} color="#179de3"  onPress={pickImage} style={styles.editIcon}/>
               

                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.name}>{user?.email}</Text>

                
                <View style={{ flex: 1, flexDirection: 'row',marginTop:15,alignSelf:'center' }}>
                    <View style={styles.rank}>
                        <Text style={{alignSelf:'center',fontFamily:'Roboto-Regular',fontSize:15}}>{t("PROFILE.RANK")} - {rank}</Text>
                    </View>
                    <View style={styles.badge}>
                    <Text style={{alignSelf:'center',fontFamily:'Roboto-Regular',fontSize:15}} >{t("PROFILE.CITIES")} - {r}</Text>
                    </View>

                </View>
            </View>

            <View style={styles.secondCard}>
                <Text style={styles.share}>{t("PROFILE.SHARE_US")}</Text>
                <View  style={styles.socialButtonView}>
                    <View style={styles.badge}>
                        <TouchableOpacity onPress={()=>Linking.openURL(`https://www.facebook.com/sharer/sharer.php?quote=download mybus time`)}>
                        <Ionicons name="logo-facebook" size={40} color="#4267B2" style={styles.socialButton}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.badge}>
                        <TouchableOpacity  onPress={()=>Linking.openURL(`https://twitter.com/intent/tweet?text=download mybus time`)}>
                    <Ionicons name="logo-twitter" size={40} color="#00acee" style={styles.socialButton} 
                   
                    />
                    </TouchableOpacity>

                    </View>
                    <View style={styles.badge}>
                    <TouchableOpacity  onPress={()=>Linking.openURL(`whatsapp://send?text=Welcome to My Bus Time. Download it!`)}>
                    <Ionicons name="logo-whatsapp" size={40} color="#075E54" style={styles.socialButton}
                   
                     />
                     </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={styles.thirdCard}>
                <Text style={styles.general}>{t("PROFILE.GENERAL")}</Text>
                <View style={styles.generalSetting}>
                    <Button style={styles.generalIcon} color={'#179de3'} size={40} icon={() => <MaterialCommunityIcons name="security" size={22} color="#179de3" />}  >
                    </Button>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={styles.generalText}>{t("PROFILE.PRIVACY")}</Text>
                        <Text style={styles.generalText2}>{t("PROFILE.CHANGE_YOUR_PASSWORD")}</Text>
                    </View>
                    <Button style={styles.greaterIcon} color={'#dddddd'} onPress={() => props.navigation.navigate({ routeName: "ResetPassword" })} > <MaterialCommunityIcons name="greater-than" size={20}  /></Button>


                </View>
                <View style={styles.generalSetting}>
                    <Button style={styles.generalIcon} color={'#179de3'} icon={() => <MaterialCommunityIcons name="information-outline" size={22} color="#179de3" />} color={'#179de3'} >
                    </Button>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={styles.generalText}>{t("PROFILE.ABOUT_US")}</Text>
                        <Text style={styles.generalText2}>{t("PROFILE.CLICK_MORE")}</Text>
                    </View>
                    <Button style={styles.greaterIcon} color={'#dddddd'} icon={() => <MaterialCommunityIcons name="greater-than" size={20} color="#dddddd" style={{marginRight:-15}} />} onPress={() => props.navigation.navigate({ routeName: "AboutUs" })} />


                </View>
                <View style={styles.generalSetting}>
                    <Button style={styles.generalIcon} icon={() => <MaterialCommunityIcons name="star-outline" size={22} color="#179de3" />} color={'#179de3'}>
                    </Button>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={styles.generalText}>{t("PROFILE.RATE")}</Text>
                        <Text style={styles.generalText2}>{t("PROFILE.RATE_US")}</Text>
                    </View>
                    <Button style={styles.greaterIcon} color={'#dddddd'} onPress={()=>Linking.openURL('market://details?id=com.whereismytrain.android')} >
                    <MaterialCommunityIcons name="greater-than"  size={20} type='evilicon'  /></Button>

                </View>

            </View>
        </ScrollView>
        </View>
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
        height: 240,
        backgroundColor:'rgb(23, 157, 227)',
        borderBottomRightRadius: 40,

    },
    profileText: {
        opacity: 0.90000004,
        width: 131,
        height: 28,
        color: '#ffffff',
        fontFamily:'Roboto-Regular',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 28,
        letterSpacing: 0.39,
        marginTop: 20,
        marginLeft: 30,
        
    },
    editIcon: {
        marginLeft: 190,
        marginTop:-35
    },

    firstCard: {
        width: '90%',
        height: 300,
        backgroundColor: '#ffffff',
        marginTop: -180,
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
        marginTop:10,
        height: 100,
        width: 100,
        marginLeft: "auto",
        marginRight: "auto",
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius:50



    },
    name: {
        color: '#042c5c',
        fontFamily:'Roboto-Regular',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0.4,
        alignSelf: 'center',
        marginTop:20,

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
        alignSelf: 'center',
        justifyContent: 'center',

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
        width: 69,
        height: 75,
        borderRadius: 12,
        backgroundColor: '#f8f9f9',
        justifyContent: 'center',
    },
    badge: {

        width: 69,
        height: 75,
        borderRadius: 12,
        backgroundColor: '#f8f9f9',
        marginLeft: 30,
        justifyContent: 'center',


    },
    share: {

        height: 17,
        color: '#179de3',
        fontFamily:'Roboto-Regular',
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
        fontFamily:'Roboto-Regular',
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 17,
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
        paddingLeft: 10,
        justifyContent: 'center',

    },
    generalText: {
        marginTop: 10,
        marginLeft: 12,
        fontFamily:'Roboto-Regular',
        fontSize: 14,


    },
    generalText2: {
        marginTop: 3,
        marginLeft: 10,
        fontFamily:'Roboto-Light',
        fontSize: 11,

    },
    greaterIcon: {
        alignItems: 'center',
        justifyContent: 'center',


    }




});
