
import React ,{useState,useEffect}from 'react';



import { Platform, View, StyleSheet, ScrollView ,FlatList} from "react-native";
import {Button,DataTable, TextInput, Paragraph,Avatar, Surface,Appbar,StatusBar, BottomNavigation, Text ,Card} from 'react-native-paper';
import { Dimensions } from 'react-native';
import ProfileScreen from './ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TopNavBar = () =>
{

const _handleMore = () => console.log('Shown more');
  return (
    <Appbar.Header
    style={{ backgroundColor: 'rgb(23, 157, 227)' }}
    >
    <Appbar.Action icon={() => <MaterialCommunityIcons name="format-align-left" color="white" size={24} />}  onPress={_handleMore } />

       <Appbar.Content title="MyBusTime" />
     </Appbar.Header>


  );
};

export default function HomeRoute (props) 
{

const [source, setSource] = useState('');
const [destination, setDestination] = useState('');
const [city,setCity] = useState('');
const [cities,setCities] = useState([]);
const [show,setShow]=useState(false);
const [dshow,dsetShow]=useState(false);

// useEffect(() => {
// if(source.length==0){
//   console.log("called");
//   setShow(false);
  
// }else if(source.length>0){
//   setShow(true);
// }
  
// }, [source,destination])

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
  setSource(cityname)
  setShow(false);
}

const dlistClick =  (cityname)=>{
  console.log("destination to",cityname);
  setDestination(cityname)
  dsetShow(false);
}

  return (
    <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' style={styles.container}>
      <TopNavBar />
    <View style={styles.dev}>
        <Surface style={styles.surface}>
          <View style={styles.routesContainer} >

           <View style={styles.routesHeader}>
             <Paragraph>
              <Avatar.Icon size={30} color="#F73D84" icon={() => <MaterialCommunityIcons color="pink" name="map-marker" size={24} />} style={{ backgroundColor: 'rgb(255, 255, 255)' }} />
              <Paragraph style={{color:'#5ab7e6'}}>  Route Details </Paragraph>
            </Paragraph>
           </View>

           <View style={styles.routesBody}>
             <TextInput
                   label="From:"
                   value={source}
                   onChangeText={(text)=>fetchCities(text,'s')}
                  //  onChangeText={source => setSource(source)}
                   underlineColor='#5ab7e6'
                   theme={{colors: {text: 'black', primary: 'rgb(23, 157, 227)'}}}
                   style={{ backgroundColor: '#f6f6f6',width:'90%' }}
               />
    {show && <FlatList style={{zIndex:100,width:'90%'}}
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
                     theme={{colors: {text: 'black', primary: 'rgb(23, 157, 227)'}}}
                     style={{ backgroundColor:'#f6f6f6', marginTop:20,width:'90%' }}
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
               onPress={() => console.log(source,destination)}
               style={{backgroundColor:'rgb(23, 157, 227)' }}
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
              <Avatar.Icon size={30} color="rgb(23, 157, 227)" icon={() => <MaterialCommunityIcons color='rgb(23, 157, 227)' name="flag" size={24} />} style={{ backgroundColor: 'rgb(255, 255, 255)' }} />
            <Paragraph style={{color:'#5ab7e6'}}> Recently Visited Routes </Paragraph>
            </Paragraph>
           </View>

           <View style={[styles.routesBody, {marginTop:5}]}>
             <DataTable  style={{width:'90%', backgroundColor:'#f6f6f6'}} >
               <DataTable.Header >
                 <DataTable.Title style={{ marginLeft:'auto'}}>
                  To Demo - From Demo
                 </DataTable.Title>

               <DataTable.Title   >Time 12:00 am - 1:00 am </DataTable.Title >
               </DataTable.Header>
               <DataTable.Header >
                 <DataTable.Title style={{ marginLeft:'auto'}}>
                  To Demo - From Demo
                 </DataTable.Title>

               <DataTable.Title   >Time 12:00 am - 1:00 am </DataTable.Title >
               </DataTable.Header>
               <DataTable.Header >
                 <DataTable.Title style={{ marginLeft:'auto'}}>
                  To Demo - From Demo
                 </DataTable.Title>

               <DataTable.Title   >Time 12:00 am - 1:00 am </DataTable.Title >
               </DataTable.Header>
             </DataTable>
          </View>
         </View>
        </Surface>
     </View>
   </ScrollView>

  );
};



// const ConnectRoute = () => <Text>Connect</Text>;

// export default function HomeScreen(props)
// {

//     // const [index, setIndex] = React.useState(0);
//     // const [routes] = React.useState([
//     //   { key: 'home', title: 'Home', icon: 'home' },
//     //   { key: 'connect', title: 'Connect', icon: 'magnify' },
//     //   { key: 'profile', title: 'Profile', icon: 'account' },
//     // ]);


//     // const renderScene = BottomNavigation.SceneMap({
//     //   home: HomeRoute,
//     //   connect: ConnectRoute,
//     //   profile: ProfileScreen,
//     // });

//   return(

//     <BottomNavigation
//      navigationState={{ index, routes }}
//      onIndexChange={setIndex}
//      renderScene={renderScene}
//      barStyle={{ backgroundColor: 'rgb(23, 157, 227)', padding: 4 }}
//    />


//   )
// }







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
    elevation: 4,
  },
  surface1: {
    height: 'auto',
    borderRadius: 8,
    width: '99%',
    elevation: 4,
  },
  routesContainer:{
   paddingTop: 15,
   padding:5,
  },
  routesHeader:{
   paddingLeft: '5%',

  },
  routesBody:{
   alignItems: "center",
  },
  routesFooter:{
    paddingTop: 15,
    alignItems: "center",
    paddingLeft: '55%',

    },
});
