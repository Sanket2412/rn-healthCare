import react from "react";
import { View, StyleSheet,Text } from "react-native";
const MedicalPrescriptionScreen=(props)=>{
    return(
        <View style={styles.container}>
            <Text> Medical Prescription Screen</Text>
        </View>
    );
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "#ffedff",
    }
})

export default MedicalPrescriptionScreen;