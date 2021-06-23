
import React ,{useState,useEffect}from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Platform, View, StyleSheet, ScrollView ,FlatList,StatusBar} from "react-native";
import {Button,DataTable, TextInput, Paragraph,Avatar, Surface,Appbar, BottomNavigation, Text ,Card,Drawer} from 'react-native-paper';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { instance } from '../utils/axiosConfig';
import { Keyboard } from 'react-native';
import {Ionicons} from '@expo/vector-icons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function HomeRoute (props) 
{
  const TopNavBar = () =>
{

  return (
    <Appbar.Header 
    style={{ backgroundColor: 'rgb(23, 157, 227)' }}
    >

    <Appbar.Action onPress={()=>props.navigation.toggleDrawer()} icon={() => <MaterialCommunityIcons name="format-align-left" size={24}  color="white"/>} />

       <Appbar.Content title="MyBusTime" titleStyle={{fontFamily:'Roboto-Regular'}} />
     </Appbar.Header>


  );
};

const [source, setSource] = useState('');
const [destination, setDestination] = useState('');
const [city,setCity] = useState('');
const [cities,setCities] = useState([]);
const [show,setShow]=useState(false);
const [dshow,dsetShow]=useState(false);
const [user,setUser]=useState({});
const [recents,setRecents]=useState([]);

useEffect(() => {
  AsyncStorage.getItem('user').then(data=>JSON.parse(data)).then(res=>{
      console.log(res)
      setUser(res);
  });
}, [])
useEffect(() => {
  instance.get(`/recent?user=${user._id}`).then(res=>{
    if(res.status==200){
      setRecents(res.data.result);
    }
  })
}, [user])

const fetchCities = (text,action)=>{
  if(action=='s'){
    setSource(text)
    setShow(true);
  }else if(action=='d'){
    setDestination(text);
    dsetShow(true);
  }
  
  fetch("https://mybustime.herokuapp.com/delhi?query="+text)
  .then(item=>item.json())
  .then(cityData=>{
    console.log(cityData.slice(0,9));
      setCities(cityData.slice(0,9))
  })
}
const listClick =  (cityname)=>{
  Keyboard.dismiss()
  setSource(cityname)
  setShow(false);
}

const dlistClick =  (cityname)=>{
  Keyboard.dismiss()
  console.log("destination to",cityname);
  setDestination(cityname)
  dsetShow(false);
}

  return (
    <View style={{flex:1}}>
        <TopNavBar />
   

    <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' style={styles.container}>
    
    <View style={styles.dev}>
        <Surface style={styles.surface}>
          <View style={styles.routesContainer} >

           <View style={styles.routesHeader}>
             <Paragraph>
              <Avatar.Icon size={30} color="#F73D84" icon={() => <MaterialCommunityIcons name="map-marker" size={24} color="#F73D84" />} style={{ backgroundColor: 'rgb(255, 255, 255)',paddingTop:20 }} />
              <Paragraph style={{color:'#5ab7e6',paddingTop:8, fontFamily:'Roboto-Regular',fontSize:15}}>  Route Details </Paragraph>
            </Paragraph>
           </View>

           <View style={styles.routesBody}>
             <TextInput
                   label="From:"
                   value={source}
                   onChangeText={(text)=>fetchCities(text,'s')}
                  //  onChangeText={source => setSource(source)}
                   underlineColor='#5ab7e6'
                   theme={{colors: {text: 'black', primary: 'rgb(23, 157, 227)',fontFamily:'Poppins'}}}
                   style={{ backgroundColor: '#f6f6f6',width:'90%',borderRadius:12,borderTopRightRadius:12,borderTopLeftRadius:12}}
               />
    {show &&  <FlatList style={{zIndex:100,width:'90%'}}
        data={cities}
        keyboardShouldPersistTaps = "always"
        renderItem={({item})=>{
            return(
                <Card 
                 style={{margin:2,padding:12}}
                 onPress={()=>listClick(item.stop_name)}
                > 
                    <Text>{item.stop_name}</Text>
       
                </Card>
            )
        }}
        keyExtractor={item=>item.stop_id}
        />}
               <TextInput
                     label="To:"
                    value={destination}
                    onChangeText={(text)=>fetchCities(text,'d')}
                    //  onChangeText={destination => setDestination(destination)}
                     underlineColor='#5ab7e6'
                     theme={{colors: {text: 'black', primary: 'rgb(23, 157, 227)',fontFamily:'Poppins'}}}
                     style={{ backgroundColor:'#f6f6f6', marginTop:20,width:'90%',borderRadius:12,borderTopRightRadius:12,borderTopLeftRadius:12 }}
               />
               {dshow  && <FlatList style={{elevation:100,width:'90%'}}
        data={cities}
        keyboardShouldPersistTaps = "always"
        renderItem={({item})=>{
            return(
                <Card 
                 style={{margin:2,padding:12}}
                 onPress={()=>dlistClick(item.stop_name)}
                >
                    <Text>{item.stop_name}</Text>
                </Card>
            )
        }}
        keyExtractor={item=>item.stop_id}
        />}
           </View>

           <View style={styles.routesFooter}>
             <Button
               mode="contained"
               onPress={() => props.navigation.navigate({ routeName: "RouteDetails" ,params:{to:destination,from:source,user:user}})}
               style={{backgroundColor:'rgb(23, 157, 227)' ,marginBottom:10 , borderRadius:12}}
               disabled={!source && !destination}
               >
                Search
             </Button>
           </View>

        
         </View>
         </Surface>
        <Surface style={[styles.surface1, {marginTop:30}]}>
          <View style={styles.routesContainer} >
           <View style={styles.routesHeader}>
             <Paragraph>
              <Avatar.Icon size={30} color="rgb(23, 157, 227)" icon={() => <MaterialCommunityIcons name="flag" size={24}  color="#45ade3"/>} style={{ backgroundColor: 'rgb(255, 255, 255)',paddingTop:20 }} />
            <Paragraph style={{color:'#5ab7e6',paddingTop:10,fontFamily:'Roboto-Regular',fontSize:15}}> Recently Visited Routes </Paragraph>
            </Paragraph>
           </View>

           <View style={[styles.routesBody, {marginTop:5}]}>
             {/* <DataTable  style={{width:'90%',height:'auto', backgroundColor:'#f6f6f6',borderRadius:12}} >
              {recents?.map((rec,i)=>( <DataTable.Header  key={i} style={{height:60,justifyContent:'center',alignItems:'center'}} >
                 <DataTable.Title   theme={{colors: {text: 'black', primary: 'rgb(23, 157, 227)',fontFamily:'Montserrat-Bold'}}} onPress={()=>props.navigation.navigate({ routeName: "RouteDetails" ,params:{to:rec.to_stop_name,from:rec.from_stop_name,user:user}})} style={{width:'40%',marginLeft:-5,fontFamily:'Poppins'}}>
                 {rec.from_stop_name}      - 
                 </DataTable.Title>
                <DataTable.Title style={{ width:'40%',marginRight:'-5%',fontFamily:'Poppins'}}>{rec.to_stop_name}</DataTable.Title >
               </DataTable.Header >))}
             </DataTable> */}

             <View style={{backgroundColor: '#f6f6f6',width:'99%',flex:1,flexDirection:'column',borderRadius:10,height:'auto'}}>
             {recents?.map((rec,i)=>(
               <View style={{borderBottomWidth:1,borderBottomColor:"rgb(23, 157, 227)",width:'90%',flex:1,flexDirection:'row',alignSelf:'center',marginBottom:12,paddingTop:10}}>
             <Text style={{ width:'45%',alignSelf:"center",fontFamily:'Roboto-Regular',marginLeft:-5,fontSize:13}} onPress={()=>props.navigation.navigate({ routeName: "RouteDetails" ,params:{to:rec.to_stop_name,from:rec.from_stop_name,user:user}})}>  {rec.from_stop_name} </Text>
             <Ionicons name="swap-horizontal-outline" size={22} color='rgb(23, 157, 227)'  style={{alignSelf:'center',paddingLeft:2,paddingRight:5}}/>

             <Text style={{width:'45%',alignSelf:'center',fontFamily:'Roboto-Regular',marginRight:10,fontSize:13,marginLeft:10}}>{rec.to_stop_name}</Text>
             </View>))}

             </View>
             
          </View>
         </View>
        </Surface>
     </View>
   </ScrollView>
   </View>

  );
};








const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
  },
  dev:{
    padding: 10,
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    height:'100%',
  },
  surface: {
    height: 260,
    borderRadius: 8,
    width: '99%',
   elevation: 2,
  },
  surface1: {
    height: 'auto',
    borderRadius: 8,
    width: '99%',
    elevation: 1,
  },
  routesContainer:{
   paddingTop: 15,
   padding:5,
   paddingBottom:20,
  },
  routesHeader:{
   paddingLeft: '5%',
   

  },
  routesBody:{
   alignItems: "center",
   paddingTop:5,
  },
  routesFooter:{
    paddingTop: 15,
    alignItems: "center",
    paddingLeft: '55%',

    },
});
