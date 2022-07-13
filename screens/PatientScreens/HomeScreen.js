import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  ImageBackground,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Avatar, Snackbar } from "react-native-paper";
import { Fragment } from "react";
import VisitsList from "../../component/Patient/HomeScreen/VisitsList";
import DateTimePicker from "react-native-modal-datetime-picker";
import { background, defaultAvatar } from "../../constant/constants";
import * as authActions from "../../store/actions/auth";
import * as userActions from "../../store/actions/users";
import * as appointmentActions from "../../store/actions/appointment";
const { height } = Dimensions.get("window");
const Doctor = {
  name: "🧑‍⚕️Dr. Shah",
  phoneNumber: 8087309626,
  clinicAddress: "🏥Demo Address Near Demo Road!",
};
const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const [bookAppointment, setBookAppointment] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState({
    isError: false,
    message: "",
  });
  const userLoggedIn = useSelector((state) => state.user.loggedInUser);
  const appointments = useSelector((state) => state.appointment.appointments);
  const dialCall = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${Doctor.phoneNumber}`;
    } else {
      phoneNumber = `teh blprompt:${Doctor.phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };
  useEffect(() => {
    dispatch(appointmentActions.fetchAppointments());
  }, [dispatch]);
  const onbookConfirmHandler = (date) => {
    if (date.getDay() === 0) {
      setBookAppointment(false);
      setBookingError({
        isError: true,
        message: "Doctor is Not Avaliable On Sunday Try Another Day",
      });
      return;
    }
    if (appointments.length > 0) {
      const dayBookingArray = appointments.filter((item) => {
        let itemDate = new Date(item.bookedDate).toDateString();
        return item.enabled && itemDate === date.toDateString();
      });
      if (dayBookingArray.length === 25) {
        setBookAppointment(false);
        setBookingError({
          isError: true,
          message:
            "All Appointments For That Day Are Full Try For Different Date",
        });
        return;
      }
      let item = appointments.find((item) => {
        let itemDate = new Date(item.bookedDate).toDateString();
        return (
          item.enabled &&
          itemDate === date.toDateString() &&
          item.userId === userLoggedIn.key
        );
      });
      if (item) {
        setBookAppointment(false);
        setBookingError({
          isError: true,
          message: "Your Appointment Is Already Booked For This Date",
        });
        return;
      }
    }
    const bookingData = {
      bookedDate: date,
      enabled: true,
      status:"pending",
      bookingCreatedDate: new Date().toISOString(),
    };
    try {
      dispatch(appointmentActions.bookAppointment(bookingData));
      setBookingSuccess(true);
    } catch (error) {
      setBookingError({ isError: true, message: error.message });
    }
    setBookAppointment(false);
  };
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Fragment>
          <View style={{ flexDirection: "row-reverse" }}>
            <Button
              icon="logout"
              style={{ marginLeft: 15 }}
              labelStyle={{ fontSize: 24 }}
              onPress={() => {
                dispatch(userActions.clearLoggedInUser());
                dispatch(authActions.logout());
              }}
              title=""
              color="white"
            />
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Profile")}
              style={{ margin: 5 }}
            >
              {userLoggedIn.profilePic === defaultAvatar ? (
                <Avatar.Text
                  style={{ backgroundColor: "#76BA99" }}
                  color="white"
                  label={userLoggedIn.name.substring(0, 1)}
                  size={35}
                />
              ) : (
                <Avatar.Image
                  size={40}
                  source={{ uri: userLoggedIn.profilePic }}
                />
              )}
            </TouchableOpacity>
            <Button
              icon="phone"
              style={{ marginRight: 5 }}
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
      <Snackbar
        visible={bookingSuccess || bookingError.isError}
        duration={7000}
        onDismiss={() => {
          setBookingSuccess(false);
          setBookingError({ isError: false, message: "" });
        }}
        wrapperStyle={{
          top:height-250,
        }}
        action={{
          label:"Close",
          onPress:() => {
            setBookingSuccess(false);
            setBookingError({ isError: false, message: "" });
          }
        }}
      >{bookingSuccess ? "Appointment Booked SuccessFully" : bookingError.message}</Snackbar>
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
          onConfirm={onbookConfirmHandler}
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
