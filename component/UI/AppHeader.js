import React from "react";
import { View } from "react-native";
import { Text, Title,Subheading } from "react-native-paper";

const AppHeader=()=>{
    return(
        <View style={{marginTop:100,marginVertical:1,justifyContent:"center", alignItems:"center"}}>
            <Title variant="displayLarge">HEALTHCARE APP</Title>
            <Subheading variant="headlineSmall">Keeping You Tension Free</Subheading>
        </View>
    );
}

export default AppHeader;