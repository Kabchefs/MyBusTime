
import React from 'react';
import {
  StyleSheet
} from 'react-native';
import socketIOClient from 'socket.io-client';
import ChatRoom from './ChatRoom.js';
import Merge from './Merge.js';
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      name: "Anonymus",
      room: "",
      isValid: false,
    }
    this.socket = socketIOClient('https://mybustime.herokuapp.com', {
      transports: ['websocket'],
      forceNew: true,
      upgrade: false,
    });
    this.socket.connect(); 
    this.socket.on('connect', () => console.log('connected'));
    this.socket.on('disconnect', () => console.log('disconnected'));
  }

  componentDidMount() {
    let data=this.props.navigation.getParam('data');
    console.log(data);
    this.setState({room:data.room_id})
  }
  

  render() {
    return (
      <ChatRoom
        name={this.state.name}
        room={this.state.room}
        socket={this.socket}
      />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '70%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#0f97e0'
  },
  inputText: {
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    fontSize: 15,
    width: '80%',
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  submitBtn: {
    marginTop: 25,
    width: '60%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#c1c1c1'
  },
  btnText: {
    fontSize: 20,
    color: '#5b5b5b',
  }
})