import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/PharmacyScreens/HomeScreen";
const PharmacyNavigator=()=>{
    const PharmacyStackNavigator=createNativeStackNavigator();
    return(
        <PharmacyStackNavigator.Navigator>
            <PharmacyStackNavigator.Screen name="Home" component={HomeScreen}/>
        </PharmacyStackNavigator.Navigator>
    )
}
export default PharmacyNavigator;