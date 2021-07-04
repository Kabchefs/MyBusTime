import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet,Keyboard,Dimensions} from 'react-native';
import {Bubble, GiftedChat, Send,InputToolbar} from 'react-native-gifted-chat';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import {Avatar,Appbar,Switch} from 'react-native-paper';


const windowWidth = Dimensions.get('window').width;

 export  default function ChatScreen( props) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [messages, setMessages] = useState([]);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const TopNavBar = () =>
{

  return (
    <Appbar.Header 
    style={{ backgroundColor: 'rgb(23, 157, 227)' }}
    >

    {/* <Appbar.Action onPress={()=>props.navigation.toggleDrawer()} icon={() => <MaterialCommunityIcons name="format-align-left" size={24}  color="white"/>} /> */}
    <View style={{flex:1,flexDirection:'row',backgroundColor:'rgb(23, 157, 227)',width:windowWidth,height:'100%',paddingLeft:20,borderRadius:5}}>
         <Ionicons name="chevron-back-sharp" size={25} color='#fff' style={{alignSelf:'center'}} onPress={() => props.navigation.goBack()}/>
       <Avatar.Image size={35} source={require('../assets/images/profile.png')}  style={{alignSelf:'center',paddingLeft:20}} backgroundColor={'rgb(23, 157, 227)'}/>
       <View style={{flex:1,flexDirection:'column',paddingLeft:30,alignSelf:'center'}}>
           <Text style={{fontFamily:'Roboto-Regular',fontSize:13}}>Anonymous</Text>
           <Text style={{color:'#f4f8f9',fontFamily:'Roboto-Regular',fontSize:12}}>Active</Text>

       </View>
       <Ionicons name="call-sharp" size={22} color='#fff' style={{paddingRight:30,alignSelf:'center'}}/>
       </View>

     </Appbar.Header>


  );
};

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginRight: 5,alignSelf:'center',marginBottom:5}}
            size={40}
            color='rgb(23, 157, 227)'
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'rgb(23, 157, 227)',
          },
          left:{
            backgroundColor: '#f4f8f9',
          }
        }}
        textStyle={{
          right: {
            color: '#fff', 
            fontFamily:'Roboto-Regular'
          },
          left:{
            
            fontFamily:'Roboto-Regular'
          }
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <MaterialCommunityIcons name="chevron-double-down" size={30} color='#000'/>
    );
  }
  const renderActions=()=>{
    return(
        <MaterialCommunityIcons name="close-circle" size={40} color='rgb(23, 157, 227)' 
         style={{paddingLeft:5,alignSelf:'center'}}/>
      );
  }
  const renderInputToolbar= (props) =>{
     //Add the extra styles via containerStyle
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />
  }
  const HeaderComponent=()=>{
    return(
      <View  style={{backgroundColor:'rgb(23, 157, 227)',marginTop:20,height:60,width:'95%',alignSelf:'center',borderRadius:40,justifyContent:'center'}}>
      <View style={{flexDirection:'row',alignSelf:'center',paddingTop:10,paddingLeft:'20%'}}>
        <Avatar.Image size={35} source={require('../assets/images/profile.png')}   backgroundColor={'rgb(23, 157, 227)'}/>
        <View style={{flex:1, flexDirection:'column',marginTop:3,paddingLeft:'10%'}}>
          <Text style={{color:'#fff'}}>...................</Text>
          <Text style={{color:'#fff'}}>Connected</Text>
        </View>
        <Avatar.Image size={35} source={require('../assets/images/profile.png')}   backgroundColor={'rgb(23, 157, 227)'} style={{paddingRight:'40%'}}/>
        {/* <Text style={{color:'#fff',width:'27%',marginLeft:15}}>Show Name/Hide Name</Text>
        <Switch color={'#fff'} value={isSwitchOn} onValueChange={onToggleSwitch} /> */}

      </View>
      </View>

    );
  }
  const ChatComponent=()=>{
    return(
      <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
     
      renderInputToolbar={renderInputToolbar}
     
    />

    );
  }

 
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}> 
    <TopNavBar/>
      <HeaderComponent/>
    
       <ChatComponent /> 
   
    
   
     </View>
  );
};


ChatScreen.navigationOptions = (props) => {
 
    return {
      headerShown: false,
     
    };
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputToolbar:{
    marginLeft: 10,
    marginRight:10,
    height:50,
    borderTopColor: "#E8E8E8",
    borderTopWidth: 1,
    backgroundColor:'#f4f8f9'
  
  
   
   
    }
});
