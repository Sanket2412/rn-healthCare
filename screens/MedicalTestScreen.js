import react from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
const MedicalTestScreen=(props)=>{
    return(
        <ImageBackground source={{uri:"https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX26510670.jpg"}} style={styles.container}>
            <Text>Medical Test Screen</Text>
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

export default MedicalTestScreen;