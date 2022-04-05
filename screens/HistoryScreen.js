import react from "react";
import { View, StyleSheet, Text } from "react-native";
const HistoryScreen=(props)=>{
    return(
        <View style={styles.container}>
            <Text>History Screen</Text>
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

export default HistoryScreen;