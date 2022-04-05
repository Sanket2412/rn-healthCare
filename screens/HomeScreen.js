import React, {useLayoutEffect} from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import EmergencyDetails from "../component/Patient/HomePage/EmergencyDetails";

const { height, width } = Dimensions.get("window");
const HomeScreen = (props) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          icon="account-box"
          labelStyle={{ fontSize: 27 }}
          onPress={() => console.log("Pressed")}
          title=""
          color="white"
        />
      ),
    });
  }, [props.navigation]);
  return (
    <ScrollView style={styles.app}>
      <View style={styles.container}>
        <EmergencyDetails />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex:1,
    backgroundColor: "#ffedff",
    //backgroundColor: "#039dfc",
  },
  container: {
    marginTop: height / 11,
  },
});
export default HomeScreen;