
import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView,FlatList } from 'react-native';
import { Button, TextInput, Appbar, Surface, Avatar ,Card} from 'react-native-paper';
import { instance } from '../utils/axiosConfig';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import SearchBar from 'react-native-searchbar';
import * as Contacts from 'expo-contacts';




export default function ConnectScreen(props) {
    // const [password, setPass] = useState('');
    // const [cpass,setCpass]=useState('');
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');
    const [search, setSearch] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [contacts,setContacts]=useState([]);
    const [cshow,setShow]=useState(false);
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

  const  getContact= async() => {
        
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
    const ContactsSearch=()=>{
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
                    onBack={() => {setIsVisible(!isVisible);setShow(false)}}
                /> : null
                }
                 <Appbar.Content title="MyBusTime" /> 
                <Appbar.Action icon={() => <Ionicons name="search" size={22} color="white" />} onPress={() => ContactsSearch()} />

{/* Show COntacts card */}

{ cshow  && <FlatList style={{elevation:100,width:'90%'}}
        data={contacts}
        keyboardShouldPersistTaps = "always"
        renderItem={({item})=>{
            return(
                <Card 
                 style={{margin:2,padding:12}}
                //  onPress={()=>dlistClick(item.firstName)}
                >
                    <Text>{item.firstName}</Text>
                </Card>
            )
        }}
        keyExtractor={item=>item.id}
        />}


{/* End Contact card  */}



            </Appbar.Header>
            <View style={styles.surface}>
                <View style={{flex:1, flexDirection:'row'}}>
                <Text style={{padding:15,color:'#ffffff',fontSize:15}}>Ranking</Text>
                    <Text style={{padding:15,paddingLeft:'58%',color:'#ffffff',fontSize:15}}
                    onPress={()=>props.navigation.navigate({routeName:'LeaderBoard'})}
                    > See All</Text>

                </View>
               <View style={{flex:1,flexDirection:'row'}}>
                <View style={styles.surfaceBox}>
                    <Text style={{color:'#ffffff',paddingLeft:30}}>2</Text>
                    <Avatar.Image size={70} source={require('../assets/images/userRank.png')} />
                    <Text style={{color:'#ffffff',paddingLeft:10}}>Robert</Text>
                    <Text style={{color:'#ffffff',paddingLeft:10}}>1000</Text>
                </View>

                <View style={[styles.surfaceBox,{marginTop:-60}]}>
                <Avatar.Image size={40} source={require('../assets/images/winner.png')} backgroundColor='rgb(23, 157, 227)' style={{paddingLeft:15}}/>
                    <Avatar.Image size={80} source={require('../assets/images/userRank.png')} />
                    <Text style={{color:'#ffffff',paddingLeft:15}}>Robert</Text>
                    <Text style={{color:'#ffffff',paddingLeft:15}}>1000</Text>
                </View>

                <View style={styles.surfaceBox}>
                <Text style={{color:'#ffffff',paddingLeft:30}}>3</Text>
                    <Avatar.Image size={70} source={require('../assets/images/userRank.png')} />
                    <Text style={{color:'#ffffff',paddingLeft:10}}>Robert</Text>
                    <Text style={{color:'#ffffff',paddingLeft:10}}>1000</Text>
                </View>
                
                </View>

            </View>

            <View style={styles.chat}>
                
                <View style={{flex:1,flexDirection:'row'}}>
                <Ionicons name="chatbubbles-sharp" size={22} color='rgb(23, 157, 227)' style={{paddingTop:10,paddingLeft:10,paddingRight:5}} />
                <Text style={styles.chatButton}>Chat/Call</Text>
                <Text style={{paddingTop:18,fontFamily:'Poppins',fontSize:11,color:'rgb(23, 157, 227)'}}>(With Annonmous MyBusTime User)</Text>
                </View>
                <View style={{borderBottomWidth:1,borderBottomColor:'#f4f8f9',marginTop:-50}}></View>

                <View style={{flex:1,flexDirection:'row', alignSelf: 'center'}}>
                <Avatar.Image size={90} source={require('../assets/images/search.png')} style={{ backgroundColor: '#ffffff', alignSelf: 'center' }}  />
                </View>
               
            </View>

            <View style={styles.requestBox}>
            <View style={{flex:1,flexDirection:'row',paddingTop:10}}>
                <Ionicons name="people-sharp" size={22} color='rgb(23, 157, 227)' style={{paddingTop:10,paddingLeft:10,paddingRight:5}} />
                <Text style={{ fontSize: 15, fontFamily: 'Montserrat-SemiBold', paddingTop:10,color:'rgb(23, 157, 227)'}}>Friend Request</Text>
                <Text style={{paddingTop:18,fontFamily:'Poppins',fontSize:11,color:'rgb(23, 157, 227)'}}>(Share Your Rank With Friends)</Text>
            </View>

            <View style={{borderBottomWidth:2,borderBottomColor:'#f4f8f9',width:'95%',alignSelf:'center'}}></View>

                
                <View style={styles.request}>
                    <View style={{backgroundColor:'#f4f8f9',height:55,width:80,borderRadius:20}}>

                    </View>
                    <Text style={{padding:15,fontSize:17,fontFamily: 'Poppins'}}> Name</Text>
                    <Ionicons name="checkmark-circle-sharp" size={35} color='rgb(23, 157, 227)' style={{paddingTop:15,paddingLeft:40}} />
                    <Ionicons name="close-circle-sharp" size={35} color='red' style={{paddingTop:15,paddingLeft:20}} />
                
                    
                </View>

                <View style={styles.request}>
                    <View style={{backgroundColor:'#f4f8f9',height:55,width:80,borderRadius:20}}>

                    </View>
                    <Text style={{padding:15,fontSize:17,fontFamily: 'Poppins'}}> Name</Text>
                    <Ionicons name="checkmark-circle-sharp" size={35} color='rgb(23, 157, 227)' style={{paddingTop:15,paddingLeft:40}} />
                    <Ionicons name="close-circle-sharp" size={35} color='red' style={{paddingTop:15,paddingLeft:20}} />
                
                    
                </View>
                <View style={styles.request}>
                    <View style={{backgroundColor:'#f4f8f9',height:55,width:80,borderRadius:20}}>

                    </View>
                    <Text style={{padding:15,fontSize:17,fontFamily: 'Poppins'}}> Name</Text>
                    <Ionicons name="checkmark-circle-sharp" size={35} color='rgb(23, 157, 227)' style={{paddingTop:15,paddingLeft:40}} />
                    <Ionicons name="close-circle-sharp" size={35} color='red' style={{paddingTop:15,paddingLeft:20}} />
                
                    
                </View>

                <View style={styles.request}>
                    <View style={{backgroundColor:'#f4f8f9',height:55,width:80,borderRadius:20}}>

                    </View>
                    <Text style={{padding:15,fontSize:17,fontFamily: 'Poppins'}}> Name</Text>
                    <Ionicons name="checkmark-circle-sharp" size={35} color='rgb(23, 157, 227)' style={{paddingTop:15,paddingLeft:40}} />
                    <Ionicons name="close-circle-sharp" size={35} color='red' style={{paddingTop:15,paddingLeft:20}} />
                
                    
                </View>

                <View style={styles.request}>
                    <View style={{backgroundColor:'#f4f8f9',height:55,width:80,borderRadius:20}}>

                    </View>
                    <Text style={{padding:15,fontSize:17,fontFamily: 'Poppins'}}> Name</Text>
                    <Ionicons name="checkmark-circle-sharp" size={35} color='rgb(23, 157, 227)' style={{paddingTop:15,paddingLeft:40}} />
                    <Ionicons name="close-circle-sharp" size={35} color='red' style={{paddingTop:15,paddingLeft:20}} />
                
                    
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
        backgroundColor: '#f4f8f9'
    },
    surface: {
        alignSelf: 'center',
        marginTop: 10,
        elevation: 4,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgb(23, 157, 227)',
        height: 200,
        width: '95%',
        borderRadius:10,
    },
    surfaceBox: {
        width: '30%',
        height: 110,
        borderRadius: 12,
        marginLeft: 20,
        justifyContent: 'center',
        marginTop:-40,
        marginBottom: 10,
        flex:1,
        flexDirection:'column',
      

    }
    ,
    chat: {
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        width: '95%',
        height: 150,
        marginTop: 10,
        borderRadius: 10,
        flex: 1,
        flexDirection:'column',
        
    },
    chatButton: {
    
        fontSize: 15,
        fontFamily: 'Montserrat-SemiBold',
        paddingTop:10,
        color:'rgb(23, 157, 227)',
       
       

    },
    requestBox: {
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        width: '95%',
        height: 'auto',
        marginTop: 10,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'column',


    },
    request: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        width: '95%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth:2,
        borderBottomColor:'#f4f8f9',
        paddingLeft:10


    }
});
