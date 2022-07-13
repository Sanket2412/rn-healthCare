import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity } from "react-native";
import { Avatar, Button, Card, List } from "react-native-paper";
import { useSelector,useDispatch } from "react-redux";
import * as appointmentActions from "../../../store/actions/appointment";
const VisitsList = (props) => {
  const dispatch= useDispatch();
  const appointmentList = useSelector(
    (state) => state.appointment.appointments
  );
  const user = useSelector((state) => state.user.loggedInUser);
  let filteredAppointmentList = [];
  if (appointmentList.length > 0) {
    filteredAppointmentList = appointmentList.filter((item) => {
      return item.enabled === true && item.userId === user.key;
    });
  }
  let curr = new Date();
  curr.setHours(0, 0, 0, 0);
  const onCancelClickHandler=(key)=>{
    Alert.alert("Are You Sure?","Are You Sure, You Want Cancel Doctor's Appointment",[
      {
        text:"Yes",
        onPress: ()=>{
          dispatch(appointmentActions.cancelAppointment(key));
        }
      },
      {
        text:"No",
      }
    ])
  }
  filteredAppointmentList.sort(function(a,b){
    var c= new Date(a.bookedDate);
    var d= new Date(b.bookedDate);
    return d-c; 
  })
  return (
    <View style={styles.content}>
      <Card elevation={20} style={{ borderRadius: 15 }}>
        <Card.Title
          title="Visit Log"
          subtitle="Please Visit Between 11 AM to 2 PM"
          style={styles.cardTitle}
          titleStyle={{
            color: "white",
            alignSelf: "center",
          }}
          subtitleStyle={{
            color: "white",
            alignSelf: "center",
          }}
        />
        {filteredAppointmentList.length === 0 && (
          <Card.Content>
            <View
              style={{
                height: "60%",
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Appointments Not Found!</Text>
            </View>
          </Card.Content>
        )}
        {filteredAppointmentList.length > 0 && (
          <FlatList
            data={filteredAppointmentList}
            keyExtractor={(item) => item.key}
            renderItem={(itemData) => {
              let title = "";
              let isCancellable=false;
              let itemDate = new Date(itemData.item.bookedDate);
              if (
                curr.getDate() === itemDate.getDate() &&
                curr.getMonth() === itemDate.getMonth() &&
                curr.getFullYear() === itemDate.getFullYear()
              ) {
                title = "Appointment Sceduled Today";
              } else if (itemDate > curr) {
                isCancellable=true;
                title = "Next Appointment Sceduled On";
              } else {
                title = "Visited On";
              }
              return (
                <View key={itemData.item.key}>
                  <Card.Content key={itemData.item.key}>
                    <List.Item
                      key={itemData.item.key}
                      style={{ height: 80 }}
                      title={title}
                      right={props => isCancellable ? <TouchableOpacity onPress={onCancelClickHandler.bind(this,itemData.item.key)}><Avatar.Icon style={{ backgroundColor: "white" }}
                      color="red"
                      size={50}
                      icon="cancel"/></TouchableOpacity> : null}
                      description={new Date(
                        itemData.item.bookedDate
                      ).toDateString()}
                    />
                  </Card.Content>
                </View>
              );
            }}
          />
        )}
        <Card.Actions
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            icon="calendar"
            mode="contained"
            color="green"
            onPress={props.openDialog}
          >
            Book Appointment
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: "100%",
    padding: 15,
  },
  cardTitle: {
    borderRadius: 15,
    backgroundColor: "#039dfc",
  },
});
export default VisitsList;
