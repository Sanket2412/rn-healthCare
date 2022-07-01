import React, { Fragment, useEffect, useState } from "react";
import { View, Text,ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import DoctorNavigator from "./Navigators/DoctorNavigator";
import MedicalTestNavigator from "./Navigators/MedicalTestNavigator";
import PatientNavigator from "./Navigators/PatientNavigator";
import PharmacyNavigator from "./Navigators/PharmacyNavigator";
const UserNavigator = (props) => {
  const [userLoggedIn,setUserLoggedIn]=useState(null);
  const [isLoading,setIsLoading]=useState(true);
  const user = useSelector((state) => state.user.loggedInUser);
  useEffect(()=>{
      if(user !== undefined)
      {
        setUserLoggedIn(user);
        setIsLoading(false);
      }
  },[user])
  if (isLoading || userLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="lightblue" />
      </View>
    );
  }
  return (
    <Fragment>
      {userLoggedIn.userType === "patient" ? <PatientNavigator /> : null}

      {userLoggedIn.userType === "doctor" ? <DoctorNavigator /> : null}

      {userLoggedIn.userType === "pharmacy" ? <PharmacyNavigator /> : null}

      {userLoggedIn.userType === "medicalTest" ? <MedicalTestNavigator /> : null}
    </Fragment>
  );
};
export default UserNavigator;
