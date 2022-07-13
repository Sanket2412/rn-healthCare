import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../../screens/DoctorScreens/HomeScreen";
import AddPrescriptionScreen from "../../screens/DoctorScreens/AddPrescriptionScreen";
import ViewPatientHistory from "../../screens/DoctorScreens/ViewPatientHistoryScreen";
import { Button } from "react-native-paper";
import CustomDrawer from "./CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: "#039dfc",
  },
  headerTintColor: "white",
};
const DoctorHomeNavigator = (props) => {
  const DoctorHomeStackNavigator = createNativeStackNavigator();
  return (
    <DoctorHomeStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <DoctorHomeStackNavigator.Screen
        name="HomeStack"
        options={{
          title: "Home",
          headerLeft:()=> (
            <Ionicons
              onPress={() => {
                props.navigation.openDrawer();
              }}
              name="md-menu"
              size={32}
              color="white"
              style={{ paddingHorizontal: 5, paddingRight:5 }}
            />
          ),
        }}
        component={HomeScreen}
      />
    </DoctorHomeStackNavigator.Navigator>
  );
};
const DoctorAddPrescriptionNavigator = (props) => {
  const DoctorAddPrescriptionStackNavigator = createNativeStackNavigator();
  return (
    <DoctorAddPrescriptionStackNavigator.Navigator
      screenOptions={defaultScreenOptions}
    >
      <DoctorAddPrescriptionStackNavigator.Screen
        name="AddPrescriptionStack"
        options={{
          title: "Send Prescriptions",
          headerLeft: ()=>(
            <Ionicons
              onPress={() => {
                props.navigation.openDrawer();
              }}
              name="md-menu"
              color="white"
              size={32}
              style={{ paddingHorizontal: 10 }}
            />
          ),
        }}
        component={AddPrescriptionScreen}
      />
    </DoctorAddPrescriptionStackNavigator.Navigator>
  );
};
const DoctorViewHistoryNavigator = (props) => {
  const DoctorViewHistoryStackNavigator = createNativeStackNavigator();
  return (
    <DoctorViewHistoryStackNavigator.Navigator
      screenOptions={defaultScreenOptions}
    >
      <DoctorViewHistoryStackNavigator.Screen
        name="ViewHistoryStack"
        options={{
          title: "View Patient History",
          headerLeft: () =>(
            <Ionicons
              onPress={() => {
                props.navigation.openDrawer();
              }}
              name="md-menu"
              color="white"
              size={32}
              style={{ paddingHorizontal: 10 }}
            />
          ),
        }}
        component={ViewPatientHistory}
      />
    </DoctorViewHistoryStackNavigator.Navigator>
  );
};
const DoctorNavigator = () => {
  const DoctorDrawerNavigator = createDrawerNavigator();
  return (
    <DoctorDrawerNavigator.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#EDEADE",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: { marginLeft: -25, fontSize: 15 },
      }}
    >
      <DoctorDrawerNavigator.Screen
        name="Home"
        component={DoctorHomeNavigator}
        options={{
          drawerIcon: (color) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <DoctorDrawerNavigator.Screen
        name="Add Prescription"
        component={DoctorAddPrescriptionNavigator}
        options={{
          drawerIcon: (color) => (
            <Ionicons name="add-outline" size={22} color={color} />
          ),
        }}
      />
      <DoctorDrawerNavigator.Screen
        name="View History"
        component={DoctorViewHistoryNavigator}
        options={{
          drawerIcon: (color) => (
            <Ionicons name="clipboard-outline" size={22} color={color} />
          ),
        }}
      />
    </DoctorDrawerNavigator.Navigator>
  );
};
export default DoctorNavigator;
