import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { background } from "../../constant/constants";
import TestList from "../../component/Patient/TestScreen/TestList";
const MedicalTestScreen=(props)=>{
    return(
        <ImageBackground source={{uri:background}} style={styles.container}>
            <View style={{paddingVertical:40,paddingHorizontal:20}}>
                <TestList {...props}/>
            </View>
        </ImageBackground>
    );
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white",
    }
})

export default MedicalTestScreen;