import react from "react";
import { View, StyleSheet, Text } from "react-native";
const MedicalTestScreen=(props)=>{
    return(
        <View style={styles.container}>
            <Text>Medical Test Screen</Text>
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

export default MedicalTestScreen;