import React, {useLayoutEffect} from "react";
import { View, StyleSheet, Dimensions, Linking,ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import { Fragment } from "react";
import VisitsList from "../component/Patient/HomePage/VisitsList";

const { height } = Dimensions.get("window");
const Doctor = {
  name: "🧑‍⚕️Dr. Shah",
  phoneNumber: 8087309626,
  clinicAddress: "🏥Demo Address Near Demo Road!",
};
const HomeScreen = (props) => {
  const dialCall = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${Doctor.phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${Doctor.phoneNumber}`;
    }

    Linking.openURL(phoneNumber);
  };
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Fragment>
          <View style={{flexDirection:"row",}}>
        <Button
          icon="account-box"
          labelStyle={{ fontSize: 27 }}
          onPress={() => console.log("Pressed")}
          title=""
          color="white"
        />
        <Button
          icon="phone"
          labelStyle={{ fontSize: 27 }}
          onPress={dialCall}
          title=""
          color="white"
        /></View></Fragment>
      ),
    });
  }, [props.navigation]);
  return (
    <ImageBackground source={{uri:"https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX26510670.jpg"}} style={{flexDirection:"column",height:"100%"}}>
      <View style={styles.app}>
      <VisitsList />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  app: {
    height:(height/ 2),
    paddingTop:(height * 0.1),
    flexDirection:"column",
    alignItems:"center"
  },
});
export default HomeScreen;