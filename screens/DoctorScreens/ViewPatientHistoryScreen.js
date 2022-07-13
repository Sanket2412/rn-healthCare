import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { background } from "../../constant/constants";
import { useSelector } from "react-redux";
import { List, Searchbar, Title } from "react-native-paper";
const ViewPatientHistoryScreen = (props) => {
  const users = useSelector((state) => state.user.users);
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    if (users.length !== 0) {
      let userArray = users.filter((user) => user.userType === "patient");
      setPatients(userArray);
    }
  }, [users]);
  const onSearchBarChange=(text)=>{
    if(text.length > 0){
      const updatedList=patients.filter(patient => patient.name.startsWith(text));
      setPatients(updatedList);
    }
    else
    {
      let userArray = users.filter((user) => user.userType === "patient");
      setPatients(userArray);
    }
  }
  return (
    <ImageBackground
      source={{uri:background}}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ padding: 20, height: "100%", width: "100%" }}>
        <Searchbar style={{marginBottom:19}} onChangeText={onSearchBarChange} placeholder="Search Paitent By Name" />
        {patients.length === 0 && <Title>Patient Not Found</Title>}
        {patients.length > 0 && <FlatList
          data={patients}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <List.Item
                  style={{ backgroundColor:"#F9F9F9", height:70, borderRadius:10, marginBottom:20 }}
                  rippleColor="lightblue"
                  titleEllipsizeMode="head"
                  titleStyle={{marginLeft:10, fontSize:18 }}
                  title={item.name}
                  left={(props) => (
                    <Image {...props} style={{width: 50, height: 50, borderRadius: 50}} source={{ uri: item.profilePic }} />
                  )}
                />
              </TouchableOpacity>
            );
          }}
        />}
      </View>
    </ImageBackground>
  );
};

export default ViewPatientHistoryScreen;
