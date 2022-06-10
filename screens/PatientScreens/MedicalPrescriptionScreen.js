import React from "react";
import { View, StyleSheet,ImageBackground } from "react-native";
import PrescriptionList from "../../component/Patient/PresciptionScreen/PrescriptionList";
import { background } from "../../constant/constants";
const MedicalPrescriptionScreen=(props)=>{
    return(
        <ImageBackground source={{uri: background}} style={styles.container}>
            <View style={{paddingVertical:40,paddingHorizontal:20}}>
                <PrescriptionList {...props}/>
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

export default MedicalPrescriptionScreen;