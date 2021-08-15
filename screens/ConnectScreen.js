import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  Button,
  TextInput,
  Appbar,
  Surface,
  Avatar,
  Card,
} from "react-native-paper";
import { instance } from "../utils/axiosConfig";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import SearchBar from "react-native-searchbar";
import * as Contacts from "expo-contacts";
import ListItem from "../components/ListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Trans,useTranslation } from "react-i18next";

export default function ConnectScreen(props) {
  const {t}=useTranslation();
  const _goBack = () => console.log("Went back");

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [cshow, setShow] = useState(true);
  const [number, setNumber] = useState([]);
  const [fromUserId, setfromuserid] = useState("");
  const [requests, setRequest] = useState([]);
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    instance.get(`/rank?user=${fromUserId}`).then(res => {
      if (res.status == 200) {
        let ranks = res.data.result;
        ranks = ranks.sort((a, b) => {
          return a.total_count - b.total_count;
        });
        console.log("ranks jiiii", ranks);
        setRanks(ranks);
      }
    })
  }, [fromUserId])

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((data) => JSON.parse(data))
      .then((res) => {
        setfromuserid(res._id);
      });
  }, []);

  useEffect(() => {
    instance.get(`/friend/all?user=${fromUserId}`).then((res) => {
      if (res.status == 200) {
        setRequest(res.data.result);
      }
    });
  }, []);

  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const contact = data[0];
        // console.log(data);
        setContacts(data);
        // setNumber(data);
      }
    }
  };

  const inputSearch = () => {
    setInput(true);
    return (
      <TextInput
        label="New Password"
        mode="flat"
        theme={{
          colors: {
            primary: "#abb4bd",
          },
        }}
      />
    );
  };
  const ContactsSearch = () => {
    setIsVisible(!isVisible);
    setShow(true);
    // getContact();
  };

  const getNumberInformat = async (str) => {
    let len = 10;
    let nstr;
    for (let i = str.length; i >= 0; i--) {
      if (str[i] == " " || str[i] == "-" || str[i] == "+") {
        continue;
      }
      if (len >= 0) {
        nstr += str[i];
        len--;
      }
    }
    let a = nstr.slice(3);
    return parseInt([...a].reverse().join(""));
  };

  const onResult = async (results) => {
    console.log(results);
    setNumber(results);
    for (let a of results) {
      let userno = await getNumberInformat(a.phoneNumbers[0].number);
      console.log("number in mubee", userno);
      let user = await instance.get(`/friend?number=${userno}`);
      console.log("user matched", user.data.result);
      if (user.status == 200) {
        a.friend = true;
        a.user = user.data.result._id;
      }
    }
    setNumber(results);
  };

  const acceptRequest = (id) => {
    let user = {
      user: id,
    };
    instance.post("/friend/accept", user).then((res) => {
      if (res.status == 200) {
        console.log("Accepted Sucessfully");
      }
    });
  };

  const rejectRequest = (id) => {
    let user = {
      user: id,
    };
    instance.delete("/friend/", user).then((res) => {
      if (res.status == 200) {
        console.log("Accepted Sucessfully");
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "rgb(23, 157, 227)" }}>
        <Appbar.Action
          onPress={() => props.navigation.toggleDrawer()}
          icon={() => (
            <MaterialCommunityIcons
              name="format-align-left"
              size={24}
              color="white"
            />
          )}
        />

        {isVisible ? (
          <SearchBar
            data={contacts}
            showOnLoad
            handleResults={onResult}
            onBack={() => {
              setIsVisible(!isVisible);
              setShow(false);
            }}
          />
        ) : null}
        <Appbar.Content
          title="MyBusTime"
          titleStyle={{ fontFamily: "Roboto-Regular" }}
        />
        <Appbar.Action
          icon={() => <Ionicons name="search" size={22} color="white" />}
          onPress={() => ContactsSearch()}
        />
      </Appbar.Header>

      {/* {cshow &&  <ContactShow/>} */}
      {cshow && (
        <ScrollView style={{ flex: 1, zIndex: 9999 }}>
          {number?.map((contact) => {
            console.log(contact?.name, contact?.id);
            return (
              <ListItem
                keyboardShouldPersistTaps="always"
                rightText={contact.friend ? "Send Request" : "Invite"}
                key={contact?.id}
                title={`${contact?.name}`}
                data={contact.user}
                from_user_id={fromUserId}
                onPress={() =>
                  Linking.openURL(
                    `whatsapp://send?text=Welcome to My Bus Time. Download it!&phone=${contact?.phoneNumbers[0].number}`
                  )
                }
                onDelete={() => console.log("delere")}
                description={
                  contact?.phoneNumbers
                    ? contact.phoneNumbers[0].number
                    : "No Number"
                }
              />
            );
          })}
        </ScrollView>
      )}

      {/* end */}


      <ScrollView style={styles.container}>
        {cshow && (
          <ScrollView style={{ flex: 1, zIndex: 9999 }}>
            {number?.map((contact) => {
              console.log(contact?.name, contact?.id);
              return (
                <ListItem
                  keyboardShouldPersistTaps="always"
                  rightText={contact.friend ? "Send Request" : "Invite"}
                  key={contact?.id}
                  title={`${contact?.name}`}
                  data={contact.user}
                  from_user_id={fromUserId}
                  onPress={() =>
                    Linking.openURL(
                      `whatsapp://send?text=Welcome to My Bus Time. Download it!&phone=${contact?.phoneNumbers[0].number}`
                    )
                  }
                  onDelete={() => console.log("delere")}
                  description={
                    contact?.phoneNumbers
                      ? contact.phoneNumbers[0].number
                      : "No Number"
                  }
                />
              );
            })}
          </ScrollView>
        )}
        <View style={styles.surface}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text
              style={{
                padding: 15,
                color: "#ffffff",
                fontSize: 15,
                fontFamily: "Roboto-Regular",
              }}
            >
              {t("CONNECT.RANKING")}
            </Text>
            <Text
              style={{
                padding: 15,
                paddingLeft: "58%",
                color: "#ffffff",
                fontSize: 15,
                fontFamily: "Roboto-Regular",
              }}
              onPress={() =>
                props.navigation.navigate({ routeName: "LeaderBoard", params: { data: ranks } })
              }
            >
              {" "}
              {t("CONNECT.SEE_ALL")}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.surfaceBox}>
              <Text style={{ color: "#ffffff", paddingLeft: 30 }}>2</Text>
              <Avatar.Image
                size={70}
                source={require("../assets/images/userRank.png")}
              />
              <Text
                style={{
                  color: "#ffffff",
                  paddingLeft: 10,
                  fontFamily: "Roboto-Regular",
                }}
              >
                {ranks[1]?.user?.name}
              </Text>
              <Text
                style={{
                  color: "#ffffff",
                  paddingLeft: 10,
                  fontFamily: "Roboto-Regular",
                }}
              >
                {ranks[1]?.total_count}
              </Text>
            </View>

            <View style={[styles.surfaceBox, { marginTop: -60 }]}>
              <Avatar.Image
                size={40}
                source={require("../assets/images/winner.png")}
                backgroundColor="rgb(23, 157, 227)"
                style={{ paddingLeft: 20 }}
              />

              <Avatar.Image
                size={80}
                source={require("../assets/images/userRank.png")}
              />
              <Text
                style={{
                  color: "#ffffff",
                  paddingLeft: 15,
                  fontFamily: "Roboto-Regular",
                }}
              >
                {ranks[0]?.user?.name}
              </Text>
              <Text
                style={{
                  color: "#ffffff",
                  paddingLeft: 15,
                  fontFamily: "Roboto-Regular",
                }}
              >
                {ranks[0]?.total_count}
              </Text>
            </View>

            <View style={styles.surfaceBox}>
              <Text style={{ color: "#ffffff", paddingLeft: 30 }}>3</Text>
              <Avatar.Image
                size={70}
                source={require("../assets/images/userRank.png")}
              />
              <Text
                style={{
                  color: "#ffffff",
                  paddingLeft: 10,
                  fontFamily: "Roboto-Regular",
                }}
              >
                {ranks[2]?.user?.name}
              </Text>
              <Text
                style={{
                  color: "#ffffff",
                  paddingLeft: 10,
                  fontFamily: "Roboto-Regular",
                }}
              >
                {ranks[2]?.total_count}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.chat}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Ionicons
              name="chatbubbles-sharp"
              size={22}
              color="rgb(23, 157, 227)"
              style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 5 }}
            />
            <Text style={styles.chatButton}>{t("CONNECT.CHAT")}/{t("CONNECT.CALL")}</Text>
            <Text
              style={{
                paddingTop: 18,
                fontSize: 11,
                color: "rgb(23, 157, 227)",
                fontFamily: "Roboto-Regular",
              }}
            >
              ({t("CONNECT.CHAT_DETAILS")})
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#f4f8f9",
              marginTop: -50,
            }}
          ></View>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate({ routeName: "Searching" })
            }
          >
            <Avatar.Image
              size={90}
              source={require("../assets/images/search.png")}
              style={{ backgroundColor: "#ffffff", alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.chat}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Ionicons
              name="trophy"
              size={22}
              color="rgb(23, 157, 227)"
              style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 5 }}
            />
            <Text style={styles.chatButton}>{t("CONNECT.REWARDS")}</Text>
            <Text
              style={{
                paddingTop: 18,
                fontSize: 11,
                color: "rgb(23, 157, 227)",
                fontFamily: "Roboto-Regular",
              }}
            >
              ({t("CONNECT.YOUR_REWARDS")})
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#f4f8f9",
              marginTop: 10
            }}
          ></View>
          <Text style={{ alignSelf: 'center', fontSize: 30, fontFamily: 'Roboto-Regular', color: "rgb(23, 157, 227)", marginTop: 20, paddingBottom: 40 }}>{t("CONNECT.COMING_SOON")}....</Text>


        </View>

        <View style={styles.requestBox}>
          <View style={{ flex: 1, flexDirection: "row", paddingTop: 10 }}>
            <Ionicons
              name="people-sharp"
              size={22}
              color="rgb(23, 157, 227)"
              style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 5 }}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Roboto-Regular",
                paddingTop: 10,
                color: "rgb(23, 157, 227)",
              }}
            >
              {t("CONNECT.FRIEND_REQUEST")}
            </Text>
            <Text
              style={{
                paddingTop: 18,
                fontFamily: "Roboto-Regular",
                fontSize: 11,
                color: "rgb(23, 157, 227)",
              }}
            >
              ({t("CONNECT.FRIEND_DETAILS")})
            </Text>
          </View>

          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: "#f4f8f9",
              width: "95%",
              alignSelf: "center",
            }}
          ></View>

          {requests?.map((req, i) => (
            <View style={styles.request}>
              <View
                style={{
                  backgroundColor: "#f4f8f9",
                  height: 55,
                  width: 80,
                  borderRadius: 20,
                }}
              ></View>
              <Text
                style={{ padding: 15, fontSize: 17, fontFamily: "Roboto-Regular" }}
              >
                {" "}
                {req.from_user.name}
              </Text>
              <Ionicons
                onPress={() => acceptRequest(req._id)}
                name="checkmark-circle-sharp"
                size={35}
                color="rgb(23, 157, 227)"
                style={{ paddingTop: 15, paddingLeft: 40 }}
              />
              <Ionicons
                name="close-circle-sharp"
                size={35}
                color="red"
                style={{ paddingTop: 15, paddingLeft: 20 }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

ConnectScreen.navigationOptions = (navOpt) => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f8f9",
  },
  surface: {
    alignSelf: "center",
    marginTop: 10,
    elevation: 4,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgb(23, 157, 227)",
    height: 200,
    width: "95%",
    borderRadius: 10,
  },
  surfaceBox: {
    width: "30%",
    height: 110,
    borderRadius: 12,
    marginLeft: 20,
    justifyContent: "center",
    marginTop: -40,
    marginBottom: 10,
    flex: 1,
    flexDirection: "column",
  },
  chat: {
    backgroundColor: "#ffffff",
    alignSelf: "center",
    width: "95%",
    height: 150,
    marginTop: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: "column",
  },
  chatButton: {
    fontSize: 15,
    fontFamily: "Roboto-Regular",
    paddingTop: 10,
    color: "rgb(23, 157, 227)",
  },
  requestBox: {
    backgroundColor: "#ffffff",
    alignSelf: "center",
    width: "95%",
    height: "auto",
    marginTop: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: "column",
  },
  request: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    width: "95%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#f4f8f9",
    paddingLeft: 10,
  },
});
