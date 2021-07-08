import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions
} from 'react-native';
import {Appbar,Avatar} from 'react-native-paper';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import moment from 'moment';

export default class ChatRoom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatMessage: '',

    }
    this._onNewMsg();
  }
  


  _onNewMsg = () => {
    this.props.socket.on('chat message', (message) => {
      this.setState(prevState => ({
        messages: [...prevState.messages, message]
      }));
      this._scrollToBottom(70);
    }, () => { });
  }

  _sendMessage = () => {
    const { chatMessage } = this.state;
    // console.log(chatMessage, this.props);
    this.props.socket.emit('chat message', {
      room: this.props.room,
      from: 'Anonymous',
      text: chatMessage ? chatMessage : 'Hello',
      createdAt: new Date().now
    }, () => {
      this._scrollToBottom(50);
    });
    this.setState({ chatMessage: '' })
  }

  _renderName = (name) => {
    return this.props.name !== name ? <Text style={{ fontSize: 13, marginLeft: 5 }}> {name} </Text> : null;
  }

  _scrollToBottom = (offset) => {
    const scrollHeight = this.contentHeight - this.scrollViewHeight + offset;
    if (scrollHeight > 0) {
      this.flatlist.scrollToOffset({ offset: scrollHeight, animated: true });
    }
  }



  render() {
    const windowWidth = Dimensions.get('window').width;
    const TopNavBar = () => {

      return (
        <Appbar.Header
          style={{ backgroundColor: 'rgb(23, 157, 227)' }}
        >

          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'rgb(23, 157, 227)', width: windowWidth, height: '100%', paddingLeft: 20, borderRadius: 5 }}>
            <Ionicons name="chevron-back-sharp" size={25} color='#fff' style={{ alignSelf: 'center' }} onPress={() => this.props.navigation.goBack()} />
            <Avatar.Image size={35} source={require('../../assets/images/profile.png')} style={{ alignSelf: 'center', paddingLeft: 20 }} backgroundColor={'rgb(23, 157, 227)'} />
            <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 30, alignSelf: 'center' }}>
              <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 13 }}>Anonymous</Text>
              <Text style={{ color: '#f4f8f9', fontFamily: 'Roboto-Regular', fontSize: 12 }}>Active</Text>

            </View>
            <Ionicons name="call-sharp" size={22} color='#fff' style={{ paddingRight: 30, alignSelf: 'center' }} />
          </View>

        </Appbar.Header>


      );
    };
    const HeaderComponent=()=>{
      return(
        <View  style={{backgroundColor:'rgb(23, 157, 227)',marginTop:20,height:60,width:'95%',alignSelf:'center',borderRadius:40,justifyContent:'center'}}>
        <View style={{flexDirection:'row',alignSelf:'center',paddingTop:10,paddingLeft:'20%'}}>
          <Avatar.Image size={35} source={require('../../assets/images/profile.png')}   backgroundColor={'rgb(23, 157, 227)'}/>
          <View style={{flex:1, flexDirection:'column',marginTop:3,paddingLeft:'10%'}}>
            <Text style={{color:'#fff'}}>...................</Text>
            <Text style={{color:'#fff'}}>Connected</Text>
          </View>
          <Avatar.Image size={35} source={require('../../assets/images/profile.png')}   backgroundColor={'rgb(23, 157, 227)'} style={{paddingRight:'40%'}}/>
          {/* <Text style={{color:'#fff',width:'27%',marginLeft:15}}>Show Name/Hide Name</Text>
          <Switch color={'#fff'} value={isSwitchOn} onValueChange={onToggleSwitch} /> */}
  
        </View>
        <Text style={{textAlign:'center'}}>{moment().format('LL')}</Text>
        </View>
  
      );
    }
    return (
      <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
        <TopNavBar/>
        <HeaderComponent/>
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
                alignItems: this.props.pos == 1 ? 'flex-start':'flex-end',
              },
              textContainer: {
                maxWidth: '70%',
                marginHorizontal: 12,
                marginVertical: 5,
                paddingHorizontal: 13,
                paddingVertical: 8,
                backgroundColor: this.props.name === item.from ? '#2f73e0' : 'rgb(23, 157, 227)',
                borderRadius: 10,
              },
              text: {
                color: this.props.name === item.from ? '#ffffff' : '#fff',
                fontSize: 15,
                fontFamily:'Roboto-Regular'
              }
            }
            return (
              <View style={cellStyle.container}>
                
                {this._renderName(item.from)}
               
                <View style={cellStyle.textContainer}>
                  
                  <Text style={cellStyle.text}> {item.text} </Text>
                  <Text style={{fontSize:10}}>{moment().format('LT')}</Text>
                </View>
               
              </View>
            );
          }}
        />
        <View style={{flexDirection:'row',backgroundColor:'#f4f8f9',height:70,alignSelf:'center',width:'100%'}}>
        <TextInput
         label="Type a messgae"
         style={styles.sendBtn}
         underlineColorAndroid="transparent"
          multiline={true}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this._sendMessage()}
          onChangeText={chatMessage => {
            this.setState({ chatMessage });
          }}
        />
        <MaterialCommunityIcons
            name="send-circle"
            style={{paddingLeft:5,alignSelf:'center'}}
            size={45}
            color='rgb(23, 157, 227)'
            onPress={() => this._sendMessage()}
          />
        </View>
      </SafeAreaView>
    );
  }
}
ChatRoom.navigationOptions = (props) => {

  return {
    headerShown: false,

  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtn: {
   flex:1,
    height: 50,
    borderWidth: 1,
    alignSelf:'center',
    backgroundColor: '#fff',
    marginLeft:20,
    borderRadius:10,
    elevation:2,
    shadowColor:'#f4f8f9',
    borderColor:'#fff',
    paddingLeft:'5%',
    paddingRight:'5%',
    fontFamily:'Roboto-Regular',
    fontSize:15,
    

    
    




  }
})