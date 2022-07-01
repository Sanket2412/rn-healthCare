import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PrescriptionNavigator, HomeNavigator, TestNavigator, HistoryNavigator } from "./stackNavigators";
const Tab = createBottomTabNavigator();

const tabsBottomNavigation = (props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:false,
        tabBarHideOnKeyboard:true,
        tabBarShowLabel: false,
        tabBarActiveTintColor:"green",
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
        name="TabHome"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TabPrescription"
        component={PrescriptionNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TabTest"
        component={TestNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TabHistory"
        component={HistoryNavigator}
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
