import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import DoctorNavigator from "./Navigators/DoctorNavigator";
import MedicalTestNavigator from "./Navigators/MedicalTestNavigator";
import PatientNavigator from "./Navigators/PatientNavigator";
import PharmacyNavigator from "./Navigators/PharmacyNavigator";
const UserNavigator = (props) => {
  const userLoggedIn = useSelector((state) => state.user.loggedInUser);
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
