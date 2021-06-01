
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, TextInput, Appbar, Surface } from 'react-native-paper';
import { instance } from '../utils/axiosConfig';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';



export default function ConnectScreen(props) {
    // const [password, setPass] = useState('');
    // const [cpass,setCpass]=useState('');
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');


    return (
        <ScrollView style={styles.container}>
            <Appbar.Header style={{ backgroundColor: 'rgb(23, 157, 227)' }}>
                <Appbar.Action icon={() => <MaterialCommunityIcons name="format-align-left" size={24} color="white" />}  />
                <Appbar.Content title="MyBusTime" />
                <Appbar.Action icon={() => <Ionicons name="search"  size={22} color="white"/>} onPress={_handleSearch} />
                
            
            </Appbar.Header>
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

            </View>

            <View style={styles.requestBox}>
                <Text style={{ color: 'rgb(23, 157, 227)', marginLeft: 10, marginTop: 10, fontSize: 20, }}>Friend Requests</Text>
                <View style={styles.request}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={{margin:10}}>Name :</Text>
                        <Text style={{margin:10,marginTop:-5}}>Mobile Number:</Text>

                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <Text style={{margin:25,marginLeft:90}}>Active</Text>

                    </View>




                </View>
                <View style={styles.request}>
                <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={{margin:10}}>Name :</Text>
                        <Text style={{margin:10,marginTop:-5}}>Mobile Number:</Text>

                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        
                        <Text style={{margin:25,marginLeft:90}}>Active</Text>

                    </View>


                </View>
                <View style={styles.request}>
                <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={{margin:10}}>Name :</Text>
                        <Text style={{margin:10,marginTop:-5}}>Mobile Number:</Text>

                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <Text style={{margin:25,marginLeft:90}}>Active</Text>

                    </View>


                </View>
                <View style={styles.request}>
                <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={{margin:10}}>Name :</Text>
                        <Text style={{margin:10,marginTop:-5}}>Mobile Number:</Text>

                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <Text style={{margin:25,marginLeft:90}}>Active</Text>

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
          backgroundColor:'#ffffff',
         width:'90%',
        height: 15,
        alignSelf:'center',
        marginTop:8,
        marginBottom:10,
        borderRadius:10,


    }
});
