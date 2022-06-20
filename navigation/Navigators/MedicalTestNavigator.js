import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/MedicalTestScreens/HomeScreen";
const MedicalTestNavigator=()=>{
    const MedicalTestStackNavigator=createNativeStackNavigator();
    return(
        <MedicalTestStackNavigator.Navigator>
            <MedicalTestStackNavigator.Screen name="Home" component={HomeScreen}/>
        </MedicalTestStackNavigator.Navigator>
    )
}
export default MedicalTestNavigator;