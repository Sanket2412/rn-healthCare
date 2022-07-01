import React from "react";
import { View } from "react-native";
import { Headline, Text, Title,Subheading,Caption } from "react-native-paper"; 
const InfoView=(props)=>{
    const { label, value }= props
        return(
            <View style={{marginVertical:2 }}> 
                <Subheading>{label} </Subheading><Caption>{value}</Caption>
            </View>
        );
}

export default InfoView;