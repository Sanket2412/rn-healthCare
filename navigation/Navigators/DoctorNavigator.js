import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/DoctorScreens/HomeScreen";
const DoctorNavigator=()=>{
    const DoctorStackNavigator=createNativeStackNavigator();
    return(
        <DoctorStackNavigator.Navigator>
            <DoctorStackNavigator.Screen name="Home" component={HomeScreen}/>
        </DoctorStackNavigator.Navigator>
    )
}
export default DoctorNavigator;