import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import EmergencyDetails from "../component/Patient/HomePage/EmergencyDetails";
const Doctor = {
  name: "Dr. Shah",
  phoneNumber: "9988775566",
  clinicAddress: "Demo Address Near Demo Road!",
};
const HomeScreen = (props) => {
  return (
    <View>
      <Appbar.Header style={styles.app}>
        <Appbar.Content title="Home" subtitle={`Hello Sanket`} />
      </Appbar.Header>
      <View style={styles.container}>
        <EmergencyDetails />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    app:{
        backgroundColor:"#039dfc",
    },
  container: {
    alignItems: "center",
  },
});
export default HomeScreen;
