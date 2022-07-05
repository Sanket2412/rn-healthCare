import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../../screens/DoctorScreens/HomeScreen";
import AddPrescriptionScreen from "../../screens/DoctorScreens/AddPrescriptionScreen";
import ViewPatientHistory from "../../screens/DoctorScreens/ViewPatientHistoryScreen";
const defaultScreenOptions={
    headerStyle: {
      backgroundColor: "#039dfc",
    },
    headerTintColor: "white",
  };
const DoctorHomeNavigator = () => {
  const DoctorHomeStackNavigator = createNativeStackNavigator();
  return (
    <DoctorHomeStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <DoctorHomeStackNavigator.Screen name="HomeStack" options={{ title: "Home" }} component={HomeScreen} />
    </DoctorHomeStackNavigator.Navigator>
  );
};
const DoctorAddPrescriptionNavigator = () => {
  const DoctorAddPrescriptionStackNavigator = createNativeStackNavigator();
  return (
    <DoctorAddPrescriptionStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <DoctorAddPrescriptionStackNavigator.Screen
        name="AddPrescriptionStack"
        options={{ title: "Send Prescriptions" }}
        component={AddPrescriptionScreen}
      />
    </DoctorAddPrescriptionStackNavigator.Navigator>
  );
};
const DoctorViewHistoryNavigator = () => {
  const DoctorViewHistoryStackNavigator = createNativeStackNavigator();
  return (
    <DoctorViewHistoryStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <DoctorViewHistoryStackNavigator.Screen
        name="ViewHistoryStack"
        options={{ title: "View Patient History" }}
        component={ViewPatientHistory}
      />
    </DoctorViewHistoryStackNavigator.Navigator>
  );
};
const DoctorNavigator = () => {
  const DoctorDrawerNavigator = createDrawerNavigator();
  return (
    <DoctorDrawerNavigator.Navigator screenOptions={{ headerShown: false }}>
      <DoctorDrawerNavigator.Screen
        name="Home"
        component={DoctorHomeNavigator}
      />
      <DoctorDrawerNavigator.Screen
        name="Add Prescription"
        component={DoctorAddPrescriptionNavigator}
      />
      <DoctorDrawerNavigator.Screen
        name="View History"
        component={DoctorViewHistoryNavigator}
      />
    </DoctorDrawerNavigator.Navigator>
  );
};
export default DoctorNavigator;
