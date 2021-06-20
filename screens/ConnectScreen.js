
import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView,FlatList,Linking } from 'react-native';
import { Button, TextInput, Appbar, Surface, Avatar ,Card} from 'react-native-paper';
import { instance } from '../utils/axiosConfig';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import SearchBar from 'react-native-searchbar';
import * as Contacts from 'expo-contacts';
import ListItem from "../components/ListItem";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ConnectScreen(props) {
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');
    const [search, setSearch] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [contacts,setContacts]=useState([]);
    const [cshow,setShow]=useState(true);
    const [number,setNumber]=useState([]);
    const [fromUserId,setfromuserid]=useState('');

useEffect(()=>{
  fetchContacts();
},[])

useEffect(() => {
    AsyncStorage.getItem('user').then(data=>JSON.parse(data)).then(res=>{
        
        setfromuserid(res._id);
    });
  }, [])

const fetchContacts=async()=>{
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const contact = data[0];
        console.log(data);
        setContacts(data);
        // setNumber(data);
      }
    }
}


    const inputSearch = () => {
        setInput(true);
        return (
            <TextInput
                label="New Password"
                mode="flat"
                theme={{
                    colors: {
                        primary: '#abb4bd',
                    }
                }}

            />
        )


    }
    const ContactsSearch=()=>{
        setIsVisible(!isVisible);
        setShow(true);
        // getContact();
    }

    const getNumberInformat=async(str)=>{
        let len=10;
        let nstr;
        for( let i=str.length;i>=0;i--){
            if(str[i]==' '||str[i]=='-' || str[i]=='+'){
        continue;
            }
        if(len>=0){
            nstr+=str[i];
        len--;
        }
        }
        let a=nstr.slice(3);
        return parseInt([...a].reverse().join(''));
    }

    const onResult=async (results)=>{
        console.log(results);
        setNumber(results);
        for(let a of results){
            let userno=await getNumberInformat(a.phoneNumbers[0].number);
            console.log("number in mubee",userno);
         let user=  await instance.get(`/friend?number=${userno}`);
         console.log("user matched", user.data.result);
         if(user.status==200){
             a.friend=true;
             a.user=user.data.result._id
         }
        
        }
        setNumber(results);
       
    }

    return (

        <ScrollView style={styles.container}>

            <Appbar.Header style={{ backgroundColor: 'rgb(23, 157, 227)' }}>
                <Appbar.Action icon={() => <MaterialCommunityIcons name="format-align-left" size={24} color="white" />} />

                {isVisible ? <SearchBar
                    data={contacts}
                    showOnLoad
                    handleResults={onResult}
                    
                    onBack={() => {setIsVisible(!isVisible);setShow(false)}}
                /> : null
                }
                 <Appbar.Content title="MyBusTime" /> 
                <Appbar.Action icon={() => <Ionicons name="search" size={22} color="white" />} onPress={() => ContactsSearch()} />





            </Appbar.Header>

        {/* {cshow &&  <ContactShow/>} */}
 {cshow && <ScrollView style={{ flex: 1 ,zIndex:9999}}>
                 {number?.map(contact => {
                     console.log(contact?.name,contact?.id)
                   return (
                     <ListItem
                     keyboardShouldPersistTaps = "always"
                    //  rightText={contact?.phoneNumbers[0].number}
                    rightText={contact.friend?'Send Request':'Invite'}
                       key={contact?.id}
                       title={`${contact?.name}`}
                       data={contact.user}
                       from_user_id={fromUserId}
                    //    description={contact?.phoneNumbers[0]?.number}
                       onPress={() => Linking.openURL(`whatsapp://send?text=Welcome to My Bus Time. Download it!&phone=${contact?.phoneNumbers[0].number}`)}
                       onDelete={() =>console.log("delere")}
                    //    rightText={contact?.phoneNumbers[0].number}
                     />
                   );
                 })}
               </ScrollView>} 

               {/* end */}

            <View style={styles.surface}>
                <View style={styles.surfaceBox}>
                    <Text style={{ justifyContent: 'center', alignSelf: 'center' }}>1</Text>

                </View>
                <View style={styles.surfaceBox}>
                    <Text style={{ justifyContent: 'center', alignSelf: 'center' }}>2</Text>

                </View>
                <View style={styles.surfaceBox}>
                    <Text style={{ justifyContent: 'center', alignSelf: 'center' }}>3</Text>

                </View>

            </View>

            <View style={styles.chat}>
                <Text style={styles.chatButton}>Chat With Annonymous</Text>
                <Text style={{ alignSelf: 'center', fontSize: 15 }}>Search</Text>
                <Avatar.Icon size={60} color='rgb(23, 157, 227)' icon={() => <Ionicons name="search" size={60} color='rgb(23, 157, 227)' />} style={{ backgroundColor: '#f1f1f3', alignSelf: 'center' }} />

            </View>

            <View style={styles.requestBox}>
                <Text style={{ color: 'rgb(23, 157, 227)', marginLeft: 10, marginTop: 10, fontSize: 20, }}>Friend Requests</Text>
                <View style={styles.request}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ margin: 10 }}>Name :</Text>
                        <Text style={{ margin: 10, marginTop: -5 }}>Mobile Number:</Text>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={{ margin: 25, marginLeft: 90 }}>Active</Text>

                    </View>




                </View>
                <View style={styles.request}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ margin: 10 }}>Name :</Text>
                        <Text style={{ margin: 10, marginTop: -5 }}>Mobile Number:</Text>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        <Text style={{ margin: 25, marginLeft: 90 }}>Active</Text>

                    </View>


                </View>
                <View style={styles.request}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ margin: 10 }}>Name :</Text>
                        <Text style={{ margin: 10, marginTop: -5 }}>Mobile Number:</Text>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={{ margin: 25, marginLeft: 90 }}>Active</Text>

                    </View>


                </View>
                <View style={styles.request}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ margin: 10 }}>Name :</Text>
                        <Text style={{ margin: 10, marginTop: -5 }}>Mobile Number:</Text>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={{ margin: 25, marginLeft: 90 }}>Active</Text>

                    </View>


                </View>

            </View>


        </ScrollView>
    );
}

ConnectScreen.navigationOptions = (navOpt) => {
    return {
        headerShown: false,

    };
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    surface: {

        alignSelf: 'center',
        marginTop: 10,
        elevation: 4,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        height: 170,
        width: '95%',
    },
    surfaceBox: {
        width: '30%',
        height: 110,
        borderRadius: 12,
        backgroundColor: '#f1f1f3',
        marginLeft: 10,
        justifyContent: 'center',

        marginTop: 10,
        marginBottom: 10,

    }
    ,
    chat: {
        backgroundColor: '#f1f1f3',
        alignSelf: 'center',
        width: '95%',
        height: 120,
        marginTop: 10,
        borderRadius: 10,
        flex: 1,
    },
    chatButton: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        fontWeight: '400',
        fontFamily: 'Montserrat-SemiBold',
        alignSelf: 'center',
        //  marginTop:37,

    },
    requestBox: {
        backgroundColor: '#f1f1f3',
        alignSelf: 'center',
        width: '95%',
        height: 400,
        marginTop: 10,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'column',

    },
    request: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        width: '90%',
        height: 15,
        alignSelf: 'center',
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 10,


    }
});
