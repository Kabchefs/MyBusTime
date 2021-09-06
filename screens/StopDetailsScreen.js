
import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet, ScrollView, FlatList, Alert } from "react-native";
import { Button, DataTable, TextInput, Paragraph, Avatar, Surface, Appbar, StatusBar, BottomNavigation, Text, Switch } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { instance } from '../utils/axiosConfig';
import * as Location from 'expo-location';

export default function StopDetailsScreen(props) {
  const TopNavBar = () => {

    return (
      <Appbar.Header
        style={{ backgroundColor: 'rgb(23, 157, 227)' }}
      >

        <Appbar.Action onPress={() => props.navigation.toggleDrawer()} icon={() => <MaterialCommunityIcons name="format-align-left" size={24} color="white" />} />

        <Appbar.Content title="MyBusTime" titleStyle={{ fontFamily: 'Roboto-Regular' }} />
      </Appbar.Header>


    );
  };


  const [isSwitchOn, setIsSwitchOn] = useState(false);


  const [routes, setRoutes] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTO] = useState('');
  const [loc, setloc] = useState({});
  const [usrloc, setusrloc] = useState();
  const [index, setuserIndex] = useState();
  const [times, setTimeCheck] = useState(0);
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    // checkUserLoc();
  }, [loc, routes]);

  const checkUserLoc = () => {
    //if that trip status is present then show status only
    let found=false;
    if (routes.length && loc.coords) {
      console.log("chala ji");
      for (const [i, a] of routes.entries()) {
        let dis = getDistanceFromLatLonInKm(loc?.coords?.latitude, loc?.coords?.longitude, parseFloat(a?.city.stop_lat), parseFloat(a?.city.stop_lon));
        console.log(dis);
        if (dis < 2) {
          found=true;
          Alert.alert('Live Bus', 'The bus status is not live,Your Loc matched and to get rewards we request you to keep your location services on', [{ text: "OK" }]);
          setusrloc(a);
          setuserIndex(i);
          setTimeCheck(++times);
          if (times > 1) {
            
          } else {
            getUserLoc();
          }
          break;
          // d.push(a);
        }
      }
    }
    if(found==false) {
      Alert.alert('Live Bus', 'Your location doesn\'t match with any of stations ', [{ text: "OK" }]);
      setIsSwitchOn(false);
    }
  }

  const onToggleSwitch = async () => {
    setIsSwitchOn(!isSwitchOn);
    console.log(isSwitchOn);
    if (!isSwitchOn) {
      let { status } = await Location.requestForegroundPermissionsAsync().catch(err => console.log("no:", err));
      if (status !== 'granted') {
        console.log("nooooooooooooooooooooooooooooooooooooooooooooooooooo");
        Alert.alert('Permission', 'Permission to access location was denied, Please Allow it', [{ text: "OK" }]);
        setIsSwitchOn(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: 1 }).catch(e=>{
        Alert.alert('Permission', 'Permission to access location was denied, Please Allow it', [{ text: "OK" }]);
      });
      setloc(location);
      console.log(location);
      checkUserLoc();
    }

  }
  const getUserLoc = () => {
    const time = Date.now() - routes[index + 1].arrival_time;
    setTimeout(() => {
      //check again 
      checkUserLoc();
    }, time * 1000)
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }



  useEffect(() => {
    let routes = props.navigation.getParam('data');
    var to = props.navigation.getParam('tos');
    var from = props.navigation.getParam('froms');
    let obj = {
      trip_id: routes.from.trip_id,
      from_stop_sequence: routes.from.stop_sequence,
      to_stop_sequence: routes.to.stop_sequence
    }
    setLoading(true);
    instance.post('/delhi/route', obj).then(res => {
      setRoutes(res.data.result);
      console.log(res.data.result);
      setLoading(false);
    })
    setFrom(from);
    setTO(to);

  }, [])


  return (
    <View style={{ flex: 1 }}>
      <ScrollView >
        <TopNavBar />
        <View style={styles.routesBody}>


          <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', marginLeft: 70 }}>
            <Avatar.Icon size={30} color="#4e80e9" icon={() => <MaterialCommunityIcons name="map-marker" size={24} color="#4e80e9" />} style={{ backgroundColor: 'rgb(255, 255, 255)', paddingTop: 15 }} />
            <Paragraph style={{ color: '#5ab7e6', fontSize: 15, paddingTop: 10, fontFamily: 'Roboto-Regular' }}>  Route Details </Paragraph>
            <Text style={{ color: '#5ab7e6', fontSize: 16, paddingTop: 10, marginLeft: 40, fontFamily: 'Roboto-Regular' }}>Live</Text>
            <Switch color={'#5ab7e6'} style={{ marginTop: 10, paddingLeft: 5 }} value={isSwitchOn} onValueChange={onToggleSwitch} />
          </View>
          <View style={styles.cityNames} >
            <Text style={styles.fromCityName}>{from}</Text>
            <View style={{ flex: 1, flexDirection: 'column', width: '40%' }}>
              <Text style={{ fontSize: 12, color: '#ffffff', marginTop: 5, alignSelf: 'center', fontWeight: 'bold', textAlign: 'center' }}>{routes[0]?.arrival_time.slice(0, 5)}-{routes[routes.length - 1]?.departure_time.slice(0, 5)}</Text>
              <Text style={{ fontSize: 12, color: '#ffffff', paddingLeft: 5 }}>----------------</Text>
            </View>
            <Text style={styles.toCityName}>{to}</Text>
          </View>

          <View style={styles.stopDetails}>
            {routes.map((route, i) => (<View key={i} style={styles.stop}>
              <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 10, fontSize: 15, width: '48%', fontFamily: 'Roboto-Regular' }}>{route.city.stop_name}</Text>
              <View style={{ flex: 1, flexDirection: 'column', marginLeft: -25 }}>
                <Avatar.Icon size={18} color="#4e80e9" icon={() => <MaterialCommunityIcons name="bus-side" size={18} color="#4e80e9" />} style={{ backgroundColor: 'rgb(255, 255, 255)', paddingTop: 15, marginLeft: 15 }} />
                <Text style={{ marginLeft: 10, paddingBottom: 4, marginTop: -5 }}>........</Text>
              </View>
              <Text style={{ marginRight: 20, marginTop: 10, fontSize: 15, marginLeft: -190, fontFamily: 'Roboto-Regular' }}>{route.arrival_time.slice(0, 5)} -</Text>
              <Text style={{ marginLeft: -15, marginTop: 10, marginRight: 35, fontSize: 15, fontFamily: 'Roboto-Regular' }}>{route.departure_time.slice(0, 5)}</Text>
              {route.stop_sequence == usrloc?.stop_sequence && <Avatar.Icon size={24} color="#ffa22d" icon={() => <MaterialCommunityIcons name="map-marker-outline" size={24} color="#ffa22d" />} style={{ backgroundColor: 'rgb(255, 255, 255)', marginRight: 10, marginTop: 10 }} />}
            </View>))}
          </View>
          {loading && <Text>Please Wait...</Text>}

        </View>
      </ScrollView>
    </View>

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
    height: '100%',
  },
  routesBody: {
    width: '95%',
    height: 'auto',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,

  },
  cityNames: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: "rgb(23, 157, 227)",
    height: 70,
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 5,


  },
  fromCityName: {
    fontSize: 14,
    paddingLeft: 10,
    color: '#ffffff',
    margin: 'auto',
    alignSelf: 'center',
    width: '40%',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center'

  },
  toCityName: {
    fontSize: 14,
    color: '#ffffff',
    paddingLeft: 10,
    alignSelf: 'center',
    width: '40%',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center'
  },
  stopDetails: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
  },
  stop: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  }
});
