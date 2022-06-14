import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MedicalPrescriptionScreen from "../screens/PatientScreens/MedicalPrescriptionScreen";
import PrescriptionDetailedScreen from "../screens/PatientScreens/PrescriptionDetailedScreen";
import MedicalTestScreen from "../screens/PatientScreens/MedicalTestScreen";
import HomeScreen from "../screens/PatientScreens/HomeScreen";
import HistoryScreen from "../screens/PatientScreens/HistoryScreen";
import ProfileScreen from "../screens/PatientScreens/ProfileScreen";
import TestDetailedScreen from "../screens/PatientScreens/TestDetailedScreen";
import AuthScreen from "../screens/AuthScreens/AuthScreen";
const defaultScreenOptions={
    headerStyle: {
      backgroundColor: "#039dfc",
    },
    headerTintColor: "white",
  };

const PrescriptionStackNavigator = createNativeStackNavigator();
const HomeStackNavigator=createNativeStackNavigator();
const TestStackNavigator=createNativeStackNavigator();
const HistoryStackNavigator=createNativeStackNavigator();
const AuthStackNavigator=createNativeStackNavigator();
export const HistoryNavigator=()=>{
    return(
        <HistoryStackNavigator.Navigator screenOptions={defaultScreenOptions}>
            <HistoryStackNavigator.Screen name="History" component={HistoryScreen}/>
        </HistoryStackNavigator.Navigator>
    );
}
export const TestNavigator=()=>{
    return(
        <TestStackNavigator.Navigator screenOptions={defaultScreenOptions}>
            <TestStackNavigator.Screen name="Test" component={MedicalTestScreen}/>
            <TestStackNavigator.Screen name="Test Detailed" component={TestDetailedScreen} />
        </TestStackNavigator.Navigator>
    );
}

export const HomeNavigator=()=>{
    return(
        <HomeStackNavigator.Navigator screenOptions={defaultScreenOptions}>
            <HomeStackNavigator.Screen name="Home" component={HomeScreen}/>
            <HomeStackNavigator.Screen name="Profile" component={ProfileScreen} />
        </HomeStackNavigator.Navigator>
    );
}
export const PrescriptionNavigator = () => {
  return (
    <PrescriptionStackNavigator.Navigator
      screenOptions={defaultScreenOptions}
    >
      <PrescriptionStackNavigator.Screen
        name="Prescription"
        component={MedicalPrescriptionScreen}
      />
      <PrescriptionStackNavigator.Screen
        name="Details"
        component={PrescriptionDetailedScreen}
      />
    </PrescriptionStackNavigator.Navigator>
  );
};

export const AuthNavigator=()=>{
  return(
    <AuthStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={{title:"Authentication"}}/>
    </AuthStackNavigator.Navigator>
  );
}