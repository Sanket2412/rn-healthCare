import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Appbar } from "react-native-paper";
import EmergencyDetails from "../component/Patient/HomePage/EmergencyDetails";

const { height, width } = Dimensions.get("window");
const HomeScreen = (props) => {
  return (
    <ScrollView>
      <Appbar.Header style={styles.app}>
        <Appbar.Content title="Home" subtitle={`Hello Sanket`} />
      </Appbar.Header>
      <View style={styles.container}>
        <EmergencyDetails />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: "#039dfc",
  },
  container: {
    marginTop: height / 11,
  },
});
export default HomeScreen;
