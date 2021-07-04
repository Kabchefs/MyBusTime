
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList,Image,Dimensions } from 'react-native';
import { Button, TextInput, Appbar, Surface, Card } from 'react-native-paper';
import { instance } from '../utils/axiosConfig';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import SearchBar from 'react-native-searchbar';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function SearchingScreen(props) {
    // const [password, setPass] = useState('');
    // const [cpass,setCpass]=useState('');
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');
    // const [search, setSearch] = useState('');
    // const [isVisible, setIsVisible] = useState(false);
    // const [contacts, setContacts] = useState([]);
    // const [cshow, setShow] = useState(false);
    const [user,setUser]=useState({});
    const [chat,setChat]=useState({});

   

    useEffect(()=>{
        AsyncStorage.getItem('user').then(data=>JSON.parse(data)).then(res=>{
            console.log(res)
            setUser(res);
        });

    },[])

    useEffect(()=>{
        instance.post('/chat/join',{user:user._id}).then(res=>{
            if(res.status==200){
                console.log("res cameeeeeeee",res.data.result);
                setChat("chat jon data",res.data.result);
                let chati=res.data.result;
                if(chati.status=='waiting'){
                        joinChat(chati._id);
                }else if(chati.status=='connected'){
                    props.navigation.navigate({routeName:'Chat',params:{data:res.data.result}});
                }
               
            }
        })

    },[user])

    const joinChat=(id)=>{
        console.log("inside join chat rec",id);
       instance.get(`/chat?chat=${id}`).then(res=>{
           if(res.status==200){
               let data=res.data.result;
               if(data.status=='connected'){
                props.navigation.navigate({routeName:'Chat',params:{data:data}});
                return;
               }else{
                   joinChat(id);
               }
           }
       })
    }


    return (

        <ScrollView style={styles.container}>

            <Appbar.Header style={{ backgroundColor: 'rgb(23, 157, 227)' }}>
                <Appbar.Action onPress={()=>props.navigation.toggleDrawer()} icon={() => <MaterialCommunityIcons name="format-align-left" size={24} color="white" />} />

                {/* {isVisible ? <SearchBar
                    data={items}
                    showOnLoad
                    onBack={() => { setIsVisible(!isVisible); setShow(false) }}
                /> : null
                } */}
                <Appbar.Content title="MyBusTime" />
                {/* <Appbar.Action icon={() => <Ionicons name="search" size={22} color="white" />} onPress={() => ContactsSearch()} /> */}

                {/* Show COntacts card */}

                {/* {cshow && <FlatList style={{ elevation: 100, width: '90%' }}
                    data={contacts}
                    keyboardShouldPersistTaps="always"
                    renderItem={({ item }) => {
                        return (
                            <Card
                                style={{ margin: 2, padding: 12 }}
                            //  onPress={()=>dlistClick(item.firstName)}
                            >
                                <Text>{item.firstName}</Text>
                            </Card>
                        )
                    }}
                    keyExtractor={item => item.id}
                />} */}


                {/* End Contact card  */}



            </Appbar.Header>
            <View>
                <Text style={styles.text}>Please wait! Searching.....</Text>
                <Image
                    source={require('../assets/images/radar.gif')}
                    style={{width:windowWidth,height:windowHeight/2,alignSelf:'center'}}
                />
            </View>

        </ScrollView>
    );
}

SearchingScreen.navigationOptions = (navOpt) => {
    return {
        headerShown: false,

    };
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f8f9'
    },
    text: {
        color: 'rgb(23, 157, 227)',
        fontFamily:'Montserrat-SemiBold',
        fontSize: 17,
        padding: 40,
        alignSelf: 'center',
        textAlignVertical: 'center',
        paddingTop: 50
    }

});
