// import React,{useState,useEffect} from 'react'
// import { TextInput } from 'react-native';
// import { View ,Text} from 'react-native';
// import io from 'socket.io-client';


// let socket=io('https://ffd8a02f883a.ngrok.io');

// export default function ChatRoom(props) {

// const [chatUser,setChatUser]=useState({});
// const [messages,setMessages]=useState([]);

// socket.emit('hello','Hello this a msh');

// useEffect(()=>{
//     let data=props.navigation.getParam('data');
//     setChatUser(data);
    
//     console.log(data.room_id);
//     socket.emit('hello','Hello this a msh');
//    socket.on('message',(msg)=>{
//        let a=[...messages];
//        a.push(msg);
//        setMessages(a);
//        console.log(msg);
//    });


// },[chatUser])
//     return (
//         <View>
//             <Text>Welcome to chat app!</Text>
//             <Text>You Room id is {chatUser.room_id}</Text>
//         {messages.map((msg,i)=>(
//             <Text>{msg}</Text>
//         ))}
//             <TextInput style={{borderWidth:1,borderRadius:5}}></TextInput>
//         </View>
//     )
// }

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

export default class ChatRoom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatMessage:'',

    }
    this._onNewMsg();
  }

  _onNewMsg = () => {
    this.props.socket.on('chat message', (message) => {
      this.setState(prevState => ({
        messages: [...prevState.messages, message]
      }));
      this._scrollToBottom(70);
    }, () => {});
  }

  _sendMessage = () => {
    const {chatMessage} = this.state;
    // console.log(chatMessage, this.props);
    this.props.socket.emit('chat message', {
      room: this.props.room,
      from: 'Anonymous',
      text: chatMessage?chatMessage:'Hello',
      createdAt: new Date().now
    }, () => {
      this._scrollToBottom(50);
    });
    this.setState({chatMessage:''})
  }

  _renderName = (name) => {
    return this.props.name !== name ? <Text style={{fontSize: 13, marginLeft: 5}}> {name} </Text> : null;
  }

  _scrollToBottom = (offset) => {
    const scrollHeight = this.contentHeight - this.scrollViewHeight + offset;
    if (scrollHeight > 0) {
      this.flatlist.scrollToOffset({ offset: scrollHeight, animated: true });
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, marginTop: 20}}>
        <FlatList
          ref={flatlist => this.flatlist = flatlist}
          data={this.state.messages}
          keyExtractor={(item, index) => `${index}`}
          onContentSizeChange={(w, h) => this.contentHeight = h}
          onLayout={ev => this.scrollViewHeight = ev.nativeEvent.layout.height}
          renderItem={({ item }) => {
            const cellStyle = {
              container: {
                justifyContent: 'center',
                alignItems: this.props.name === item.from ? 'flex-end' : 'flex-start',
              },
              textContainer: {
                maxWidth: '70%',
                marginHorizontal: 12,
                marginVertical: 5,
                paddingHorizontal: 13,
                paddingVertical: 8,
                backgroundColor: this.props.name === item.from ? '#2f73e0' : '#e2e2e2',
                borderRadius: 10,
              },
              text: {
                color: this.props.name === item.from ? '#ffffff' : '#282828',
                fontSize: 15,
              }
            }
            return (
              <View style={cellStyle.container}>
                {this._renderName(item.from)}
                <View style={cellStyle.textContainer}>
                  <Text style={cellStyle.text}> {item.text} </Text>
                </View>
              </View>
            );
          }}
        />
         <TextInput
          style={styles.sendBtn}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this._sendMessage()}
          onChangeText={chatMessage => {
            this.setState({chatMessage});
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtn: {
    width: '100%',
    height: 50,
    borderWidth:2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2f73e0',
  }
})