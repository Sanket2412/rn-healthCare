import React, { useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Avatar } from "react-native-paper";
import { Fragment } from "react";
import VisitsList from "../../component/Patient/HomeScreen/VisitsList";
import DateTimePicker from "react-native-modal-datetime-picker";
import { background } from "../../constant/constants";
import * as authActions from "../../store/actions/auth";
const { height } = Dimensions.get("window");
const Doctor = {
  name: "🧑‍⚕️Dr. Shah",
  phoneNumber: 8087309626,
  clinicAddress: "🏥Demo Address Near Demo Road!",
};
const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const [bookAppointment, setBookAppointment] = useState(false);
  const [bookingDate, setBookingDate] = useState();
  const userLoggedIn = useSelector((state) => state.user.loggedInUser);
  const dialCall = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${Doctor.phoneNumber}`;
    } else {
      phoneNumber = `teh blprompt:${Doctor.phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };
  console.log(userLoggedIn);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Fragment>
          <View style={{ flexDirection: "row-reverse" }}>
            <Button
              icon="logout"
              style={{marginLeft:15}}
              labelStyle={{ fontSize: 24 }}
              onPress={() => {
                dispatch(authActions.logout());
              }}
              title=""
              color="white"
            />
            <TouchableOpacity onPress={() => props.navigation.navigate("Profile")} style={{margin:5}}>
              {userLoggedIn.profilePic!==null ? <Avatar.Text style={{backgroundColor:"#76BA99"}} color="white" label={userLoggedIn.name.substring(0,1)} size={35} /> :<Avatar.Image size={40} source={{uri:userLoggedIn.profilePic}}/> }
            </TouchableOpacity>
            <Button
              icon="phone"
              style={{marginRight:5}}
              labelStyle={{ fontSize: 24 }}
              onPress={dialCall}
              title=""
              color="white"
            />
          </View>
        </Fragment>
      ),
    });
  }, [props.navigation]);
  let minimumDate = new Date();
  minimumDate.setDate(minimumDate.getDate() + 1);
  let maxDate = new Date(
    minimumDate.getFullYear(),
    minimumDate.getMonth() + 1,
    0
  );
  return (
    <ImageBackground
      source={{ uri: background }}
      style={{ flexDirection: "column", height: "100%" }}
    >
      <View style={styles.app}>
        <VisitsList
          openDialog={() => {
            setBookAppointment(true);
          }}
        />
        <DateTimePicker
          isVisible={bookAppointment}
          minimumDate={minimumDate}
          maximumDate={maxDate}
          onConfirm={(date) => {
            setBookingDate(date.toString());
            setBookAppointment(false);
          }}
          onCancel={() => {
            setBookAppointment(false);
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  app: {
    height: height / 2,
    paddingTop: height * 0.1,
    flexDirection: "column",
    alignItems: "center",
  },
});
export default HomeScreen;
