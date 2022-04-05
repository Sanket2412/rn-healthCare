import React from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import HomeScreen from "../screens/HomeScreen";
import HistoryScreen from "../screens/HistoryScreen";
import MedicalPrescriptionScreen from "../screens/MedicalPrescriptionScreen";
import MedicalTestScreen from "../screens/MedicalTestScreen";


const Tab = createBottomTabNavigator();
const CustomTabBarButton=(props)=>{
  <TouchableOpacity style={{
    top:-30,
    justifyContent:'center',
    alignItems:'center',
    ...styles.shadow,
  }} onPress={props.onPress}>
    <View style={{
      width:70,
      height:70,
      borderRadius:35,
      backgroundColor:'#AD40AF',

    }}>
      {props.children}
    </View>
  </TouchableOpacity>
}
const tabsBottomNavigation = (props) => {
  return (
    <Tab.Navigator
      screenOptions={{
      headerStyle:{
          backgroundColor:"#039dfc",
        },
      headerTintColor:"white",
        tabBarShowLabel: false,
        tabBarActiveTintColor:"#AD40AF",
        tabBarInactiveTintColor:"#ffffff",
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 15,
          right: 15,
          elevation: 2,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          backgroundColor:"#039dfc",
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Prescription"
        component={MedicalPrescriptionScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Test"
        component={MedicalTestScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});
export default tabsBottomNavigation;
