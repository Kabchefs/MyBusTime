
import React ,{useState,useEffect}from 'react';
import { Platform, View, StyleSheet, ScrollView ,FlatList} from "react-native";
import {Button,DataTable, TextInput, Paragraph,Avatar, Surface,Appbar,StatusBar, BottomNavigation, Text ,Card,Drawer} from 'react-native-paper';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { instance } from '../utils/axiosConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';



const TopNavBar = () =>
{

  return (
    <Appbar.Header
    style={{ backgroundColor: 'rgb(23, 157, 227)' }}
    >

    <Appbar.Action icon={() => <MaterialCommunityIcons name="format-align-left" size={24}  color="white"/>}  />

       <Appbar.Content title="MyBusTime"  titleStyle={{fontFamily:'Roboto-Regular'}} />
     </Appbar.Header>


  );
};

export default function RouteDetailsScreen (props) 
{const [buses,setBuse]=useState([]);
  const [from,setFrom]=useState('');
  const [to,setTO]=useState('');
  useEffect(() => {
    let user=props.navigation.getParam('user');
    var to=props.navigation.getParam('to');
    var from=props.navigation.getParam('from');
setFrom(from);
setTO(to);
    // console.log(u);
    instance.post('/delhi',{to:to,from:from,user:user._id}).then(res=>{
      console.log(res.data.result);
      if(res.status==200){
        console.log(res.data.result)
        setBuse(res.data.result);
      }
      
    })
  
  }, [])

  return (
    <ScrollView >
      <TopNavBar />
      <View style={styles.routesBody}>

    {/* <View style={styles.dev}> */}
        {/* 
          <View style={styles.routesContainer} >

           <View style={styles.routesHeader}>
             <Paragraph>
              <Avatar.Icon size={30} color="#F73D84" icon={() => <MaterialCommunityIcons name="map-marker" size={24} color="#F73D84" />} style={{ backgroundColor: 'rgb(255, 255, 255)' }} />
              <Paragraph style={{color:'#5ab7e6'}}>  Route Details </Paragraph>
            </Paragraph>
           </View>

           */}

          <View style={{flex:1,flexDirection:'row',alignSelf:'center'}}>
          <Avatar.Icon size={30} color="#4e80e9" icon={() => <MaterialCommunityIcons name="map-marker" size={24} color="#4e80e9" />} style={{ backgroundColor: 'rgb(255, 255, 255)',paddingTop:15 }}  />
          <Paragraph style={{color:'#5ab7e6',fontSize:16,paddingTop:10,fontFamily:'Roboto-Regular'}}>  Route Details </Paragraph>
          </View>
          <View style={styles.cityNames} >
            <Text style={styles.fromCityName}>{from}</Text>
            <View style={{flex:1,flexDirection:'column',width:'10%'}}>
            <Avatar.Icon size={18} color="#4e80e9" icon={() => <MaterialCommunityIcons name="bus-side" size={18} color="#4e80e9" />} style={{ backgroundColor: "rgb(23, 157, 227)",paddingTop:18,marginLeft:2, }}  />
              <Text style={{fontSize:12,color:'#ffffff',marginLeft:-10}}>------------</Text>

            </View>

            <Text style={styles.toCityName}>{to}</Text>
          </View>

          <View  style={styles.routeDetails}>
            {buses?.map((bus,i)=>( <TouchableOpacity key={i}  onPress={()=>props.navigation.navigate({routeName:'StopDetails',params:{data:bus,from:from,to:to}})}>
            <View style={styles.route}>
            <Avatar.Icon size={60} color="#4e80e9" icon={() => <MaterialCommunityIcons name="bus" size={60} color="rgb(23, 157, 227)" />} style={{ backgroundColor: 'rgb(255, 255, 255)',marginTop:15,marginLeft:15 }}  />
              <View style={{flex:1,flexDirection:'column', marginLeft:10}}>
                  <View style={{flex:1,flexDirection:'row',paddingTop:5}}>
              <Text style={{marginRight:10,marginLeft:60,marginTop:10,fontSize:16,alignSelf:'center',fontFamily:'Roboto-Regular'}}>{bus.from.arrival_time.slice(0,5)}-</Text>
              <Text style={{marginLeft:-5,marginTop:10,marginRight:5,fontSize:16,alignSelf:'center',fontFamily:'Roboto-Regular'}}>{bus.to.departure_time.slice(0,5)}</Text>
              </View>
              <Text style={{marginLeft:60,fontFamily:'Roboto-Light'}}>Via-{bus.via.city.stop_name}</Text>
             
              </View>
              {/* <View style={{flex:1,flexDirection:'column'}}>
              <Text style={{fontSize:16,marginLeft:50,marginTop:15}}>Fair</Text>
              <Text style={{marginRight:5,fontSize:16,marginLeft:48,marginTop:20}}>90RS</Text>
              </View> */}
              
            </View>
            </TouchableOpacity>))}

            {!buses.length && <Text>No Direct Route Found, Try Again...</Text>}

            {/* <View style={styles.route}>
            <Avatar.Icon size={60} color="rgb(23, 157, 227)" icon={() => <MaterialCommunityIcons name="bus" size={60} color="rgb(23, 157, 227)" />} style={{ backgroundColor: 'rgb(255, 255, 255)',marginTop:15,marginLeft:5 }}  />
              <View style={{flex:1,flexDirection:'column', marginLeft:10}}>
                  <View style={{flex:1,flexDirection:'row',paddingTop:5}}>
              <Text style={{marginRight:20,marginTop:10,fontSize:16}}>10:00AM-</Text>
              <Text style={{marginLeft:-17,marginTop:10,marginRight:5,fontSize:16}}>10:50AM</Text>
              </View>
              <Text style={{}}>Via-Demo,Demo</Text>
             
              </View>
              <View style={{flex:1,flexDirection:'column'}}>
              <Text style={{fontSize:16,marginLeft:50,marginTop:15}}>Fair</Text>
              <Text style={{marginRight:5,fontSize:16,marginLeft:48,marginTop:20}}>90RS</Text>
              </View>
              
            </View> */}
           
            

          </View>
          
          </View>
</ScrollView>
        
  );
};


RouteDetailsScreen.navigationOptions = (navOpt) => {
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
    marginRight:10,
    marginLeft:10,
    color:'#ffffff',
    width:'45%',
    margin:'auto',
    alignSelf:'center',
    fontFamily:'Roboto-Regular'

  },
  toCityName:{
    color:'#ffffff',
   width:'42%',
    alignSelf:'center',
    marginRight:-10,
    fontFamily:'Roboto-Regular'
  }, 
  routeDetails:{
    flex:1,
    flexDirection:'column',
    marginBottom:20,
  },
  route:{
    flex:1,
    flexDirection:'row',
   
    paddingBottom:20,    
    borderBottomColor: '#F4F5F5',
    borderBottomWidth: 1,
  }
});
