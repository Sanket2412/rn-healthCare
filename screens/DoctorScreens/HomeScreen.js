import React, { useEffect } from "react";
import { View ,ImageBackground, StyleSheet, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import AppointmentList from "../../component/Doctor/AppoitmentList.js";
import { background } from "../../constant/constants.js";
import { fetchAppointments } from "../../store/actions/appointment.js";
const { height } = Dimensions.get("window");
const HomeScreen=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchAppointments());
    },[dispatch])
    return(
        <ImageBackground source={{uri:background}} style={{flexDirection:"column", height:"100%"}}>
            <View style={styles.app}>
                <AppointmentList />
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    app: {
      height: height / 2,
      paddingTop: height * 0.1,
      flexDirection: "column",
      alignItems: "center",
    },
  });
export default HomeScreen;