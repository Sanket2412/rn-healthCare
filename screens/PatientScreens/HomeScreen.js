import React, { useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Linking,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "react-native-paper";
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
  const dialCall = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${Doctor.phoneNumber}`;
    } else {
      phoneNumber = `teh blprompt:${Doctor.phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Fragment>
          <View style={{ flexDirection: "row-reverse" }}>
            <Button
              icon="logout"
              labelStyle={{ fontSize: 24 }}
              onPress={() => {
                dispatch(authActions.logout());
              }}
              title=""
              color="white"
            />
            <Button
              icon="account-box"
              labelStyle={{ fontSize: 24 }}
              onPress={() => props.navigation.navigate("Profile")}
              title=""
              color="white"
            />
            <Button
              icon="phone"
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
