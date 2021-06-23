
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList,Image,Dimensions } from 'react-native';
import { Button, TextInput, Appbar, Surface, Card } from 'react-native-paper';
import { instance } from '../utils/axiosConfig';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import SearchBar from 'react-native-searchbar';
import * as Contacts from 'expo-contacts';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function SearchingScreen(props) {
    // const [password, setPass] = useState('');
    // const [cpass,setCpass]=useState('');
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');
    const [search, setSearch] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [cshow, setShow] = useState(false);
    const items = [
        1337,
        'janeway',
        {
            lots: 'of',
            different: {
                types: 0,
                data: false,
                that: {
                    can: {
                        be: {
                            quite: {
                                complex: {
                                    hidden: ['gold!'],
                                },
                            },
                        },
                    },
                },
            },
        },
        [4, 2, 'tree'],
    ];

    const getContact = async () => {

        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Emails],
            });

            if (data.length > 0) {
                const contact = data[0];
                console.log(data);
                setContacts(data);
                setShow(true);
            }
        }
    };


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
    const ContactsSearch = () => {
        setIsVisible(!isVisible);
        getContact();
    }

    return (

        <ScrollView style={styles.container}>

            <Appbar.Header style={{ backgroundColor: 'rgb(23, 157, 227)' }}>
                <Appbar.Action icon={() => <MaterialCommunityIcons name="format-align-left" size={24} color="white" />} />

                {isVisible ? <SearchBar
                    data={items}
                    showOnLoad
                    onBack={() => { setIsVisible(!isVisible); setShow(false) }}
                /> : null
                }
                <Appbar.Content title="MyBusTime" />
                <Appbar.Action icon={() => <Ionicons name="search" size={22} color="white" />} onPress={() => ContactsSearch()} />

                {/* Show COntacts card */}

                {cshow && <FlatList style={{ elevation: 100, width: '90%' }}
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
                />}


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
