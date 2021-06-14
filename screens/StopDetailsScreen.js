
import React ,{useState,useEffect}from 'react';
import { Platform, View, StyleSheet, ScrollView ,FlatList} from "react-native";
import {Button,DataTable, TextInput, Paragraph,Avatar, Surface,Appbar,StatusBar, BottomNavigation, Text ,Switch} from 'react-native-paper';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { instance } from '../utils/axiosConfig';



const TopNavBar = () =>
{

  return (
    <Appbar.Header
    style={{ backgroundColor: 'rgb(23, 157, 227)' }}
    >

    <Appbar.Action icon={() => <MaterialCommunityIcons name="format-align-left" size={24}  color="white"/>}/>

       <Appbar.Content title="MyBusTime" />
     </Appbar.Header>


  );
};

export default function StopDetailsScreen (props) 
{
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [routes,setRoutes]=useState([]);
  const [from,setFrom]=useState('');
  const [to,setTO]=useState('');
  useEffect(() => {
    let routes=props.navigation.getParam('data');
    var to=props.navigation.getParam('to');
    var from=props.navigation.getParam('from');
    let obj={
      trip_id:routes.from.trip_id,
      from_stop_sequence:routes.from.stop_sequence,
to_stop_sequence:routes.to.stop_sequence
    }
    instance.post('/delhi/route',obj).then(res=>{
      setRoutes(res.data.result);
      console.log(res.data.result);
    })
setFrom(from);
setTO(to);

  }, [])


  return (
    
    <ScrollView >
      <TopNavBar />
      <View style={styles.routesBody}>


          <View style={{flex:1,flexDirection:'row',alignSelf:'center',marginLeft:70}}>
          <Avatar.Icon size={30} color="#4e80e9" icon={() => <MaterialCommunityIcons name="map-marker" size={24} color="#4e80e9" />} style={{ backgroundColor: 'rgb(255, 255, 255)',paddingTop:15 }}  />
          <Paragraph style={{color:'#5ab7e6',fontSize:16,paddingTop:10}}>  Route Details </Paragraph>
          <Text style={{color:'#5ab7e6',fontSize:16,paddingTop:10,marginLeft:40}}>Live</Text>
          <Switch color={'#5ab7e6'} style={{marginTop:10,paddingLeft:5}} value={isSwitchOn} onValueChange={onToggleSwitch} />
          </View>
          <View style={styles.cityNames} >
            <Text style={styles.fromCityName}>{from}</Text>
            <View style={{flex:1,flexDirection:'column'}}>
              <Text style={{fontSize:12,color:'#ffffff',marginTop:5}}>{routes[0]?.arrival_time.slice(0,5)}-{routes[routes.length-1]?.departure_time.slice(0,5)}</Text>
              <Text style={{fontSize:12,color:'#ffffff'}}>--------------------------</Text>

            </View>

            <Text style={styles.toCityName}>{to}</Text>
          </View>

          <View  style={styles.stopDetails}>
            {routes.map((route,i)=>( <View style={styles.stop}>
              <Text style={{marginLeft:10,marginRight:20,marginTop:10,fontSize:16}}>{route.city.stop_name}</Text>
              <View style={{flex:1,flexDirection:'column'}}>
              <Avatar.Icon size={18} color="#4e80e9" icon={() => <MaterialCommunityIcons name="bus-side" size={18} color="#4e80e9" />} style={{ backgroundColor: 'rgb(255, 255, 255)',paddingTop:15,marginLeft:15 }}  />
              <Text style={{marginLeft:10,paddingBottom:4,marginTop:-5}}>........</Text>
              </View>
              <Text style={{marginRight:20,marginTop:10,fontSize:16}}>{route.arrival_time.slice(0,5)}-</Text>
              <Text style={{marginLeft:-17,marginTop:10,marginRight:5,fontSize:16}}>{route.departure_time.slice(0,5)}</Text>
              <Avatar.Icon size={24} color="#ffa22d" icon={() => <MaterialCommunityIcons name="calendar" size={24} color="#ffa22d" />} style={{ backgroundColor: 'rgb(255, 255, 255)',marginRight:10,marginTop:10 }}  />
            </View>))}
            {/* <View style={styles.stop}>
              <Text style={{marginLeft:10,marginRight:20,marginTop:10,fontSize:16}}>Stop Name</Text>
              <View style={{flex:1,flexDirection:'column'}}>
              <Avatar.Icon size={18} color="#4e80e9" icon={() => <MaterialCommunityIcons name="bus-side" size={18} color="#4e80e9" />} style={{ backgroundColor: 'rgb(255, 255, 255)',paddingTop:15,marginLeft:15 }}  />
              <Text style={{marginLeft:10,paddingBottom:4,marginTop:-5}}>........</Text>
              </View>
              <Text style={{marginRight:20,marginTop:10,fontSize:16}}>10:00AM-</Text>
              <Text style={{marginLeft:-17,marginTop:10,marginRight:5,fontSize:16}}>10:50AM</Text>
              <Avatar.Icon size={24}  icon={() => <MaterialCommunityIcons name="check" size={24} color="#000000" />} style={{ backgroundColor: 'rgb(255, 255, 255)',marginRight:10,marginTop:10 }}  />
            </View> */}

            {/* <View style={styles.stop}>
              <Text style={{marginLeft:10,marginRight:20,marginTop:10,fontSize:16}}>Stop Name</Text>
              <View style={{flex:1,flexDirection:'column'}}>
              <Avatar.Icon size={18} color="#4e80e9" icon={() => <MaterialCommunityIcons name="bus-side" size={18} color="#4e80e9" />} style={{ backgroundColor: 'rgb(255, 255, 255)',paddingTop:5,marginLeft:15 }}  />
              <Text style={{marginLeft:10,paddingBottom:4,marginTop:-5}}>........</Text>
              </View>
              <Text style={{marginRight:20,marginTop:10,fontSize:16}}>10:00AM-</Text>
              <Text style={{marginLeft:-17,marginTop:10,marginRight:5,fontSize:16}}>10:50AM</Text>
              <Avatar.Icon size={24} color="#ffa22d" icon={() => <MaterialCommunityIcons name="check" size={24} color="#000000" />} style={{ backgroundColor: 'rgb(255, 255, 255)',marginRight:10,marginTop:10 }}  />
            </View> */}

            {/* <View style={styles.stop}>
              <Text style={{marginLeft:10,marginRight:20,marginTop:10,fontSize:16}}>Stop Name</Text>
              <View style={{flex:1,flexDirection:'column'}}>
              <Avatar.Icon size={18} color="#4e80e9" icon={() => <MaterialCommunityIcons name="bus-side" size={18} color="#4e80e9" />} style={{ backgroundColor: 'rgb(255, 255, 255)',paddingTop:15,marginLeft:15 }}  />
              <Text style={{marginLeft:10,paddingBottom:4,marginTop:-5}}>........</Text>
              </View>
              <Text style={{marginRight:20,marginTop:10,fontSize:16}}>10:00AM-</Text>
              <Text style={{marginLeft:-17,marginTop:10,marginRight:5,fontSize:16}}>10:50AM</Text>
              <Avatar.Icon size={24} color="#ffa22d" icon={() => <MaterialCommunityIcons name="check" size={24} color="#000000" />} style={{ backgroundColor: 'rgb(255, 255, 255)',marginRight:10,marginTop:10 }}  />
            </View> */}

            {/* <View style={styles.stop}>
              <Text style={{marginLeft:10,marginRight:20,marginTop:10,fontSize:16}}>Stop Name</Text>
              <View style={{flex:1,flexDirection:'column'}}>
              <Avatar.Icon size={18} color="#4e80e9" icon={() => <MaterialCommunityIcons name="bus-side" size={18} color="#4e80e9" />} style={{ backgroundColor: 'rgb(255, 255, 255)',paddingTop:15,marginLeft:15 }}  />
              <Text style={{marginLeft:10,paddingBottom:4,marginTop:-5}}>........</Text>
              </View>
              <Text style={{marginRight:20,marginTop:10,fontSize:16}}>10:00AM-</Text>
              <Text style={{marginLeft:-17,marginTop:10,marginRight:5,fontSize:16}}>10:50AM</Text>
              <Avatar.Icon size={24} color="#ffa22d" icon={() => <MaterialCommunityIcons name="cached" size={24} color="#000000" />} style={{ backgroundColor: 'rgb(255, 255, 255)',marginRight:10,marginTop:10 }}  />
            </View> */}

            {/* <View style={styles.stop}>
              <Text style={{marginLeft:10,marginRight:20,marginTop:10,fontSize:16}}>Stop Name</Text>
              <View style={{flex:1,flexDirection:'column'}}>
              <Avatar.Icon size={18} color="#4e80e9" icon={() => <MaterialCommunityIcons name="bus-side" size={18} color="#4e80e9" />} style={{ backgroundColor: 'rgb(255, 255, 255)',paddingTop:15,marginLeft:15 }}  />
              <Text style={{marginLeft:10,paddingBottom:4,marginTop:-5}}>........</Text>
              </View>
              <Text style={{marginRight:20,marginTop:10,fontSize:16}}>10:00AM-</Text>
              <Text style={{marginLeft:-17,marginTop:10,marginRight:5,fontSize:16}}>10:50AM</Text>
              <Avatar.Icon size={24} color="#ffa22d" icon={() => <MaterialCommunityIcons name="calendar" size={24} color="#ffa22d" />} style={{ backgroundColor: 'rgb(255, 255, 255)',marginRight:10,marginTop:10 }}  />
            </View> */}

            

          </View>
          
          </View>
</ScrollView>
        
  );
};


StopDetailsScreen.navigationOptions = (navOpt) => {
    return {
        headerShown: false
    };
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
  },
  routesBody:{
    width:'95%',
    height:'auto',
    alignSelf:'center',
    backgroundColor:'#ffffff',
    borderRadius:5,

  },
  cityNames:{
    flex:1,
    flexDirection:'row',
    alignSelf:'center',
    backgroundColor: "rgb(23, 157, 227)",
    
    height:50,
  marginTop:10,
  marginBottom:10,
  width:'100%',
  borderRadius:5,
  

  },
  fromCityName:{
    fontSize:14,
    marginRight:13,
    color:'#ffffff',
    marginLeft:10,
    margin:'auto',
    alignSelf:'center',

  },
  toCityName:{
    color:'#ffffff',
    marginLeft:-30,
    marginRight:10,
    alignSelf:'center',
  }, 
  stopDetails:{
    flex:1,
    flexDirection:'column',
    marginBottom:20,
  },
  stop:{
    flex:1,
    flexDirection:'row',
    marginBottom:10,
  }
});
