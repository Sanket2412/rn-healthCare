import React from "react";
import {  StyleSheet, Text,ImageBackground } from "react-native";
import { background } from "../../constant/constants";
const HistoryScreen=(props)=>{
    return(
        <ImageBackground source={{uri:background}} style={styles.container}>
            <Text>History Screen</Text>
        </ImageBackground>
    );
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "white",
    }
})

export default HistoryScreen;