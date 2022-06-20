import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
const HomeScreen=()=>{
    const dispatch=useDispatch();
    const onPressLogout=()=>{
        dispatch(authActions.logout())
    }
    return(
        <View style={{flex:1, justifyContent:"center",alignItems:"center"}}>
            <Text>Doctor's HomeScreen</Text>
            <TouchableOpacity onPress={onPressLogout}><Text>Logout</Text></TouchableOpacity>
        </View>
    )
}
export default HomeScreen;