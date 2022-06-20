import React,{useEffect, useState} from "react";
import { Button, Image,View,Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { defaultAvatar } from "../../constant/constants";
import { produceWithPatches } from "immer";

const ProfilePicPicker=(props)=>{
    const [image,setImage]=useState(defaultAvatar);
    const pickImage=async()=>{
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(permissionResult.granted ===false)
        {
            alert("Permission to access camera roll is required!");
            return;
        }
        let result= await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
        })
        if(!result.cancelled)
        {
            setImage(result.uri);
        }
    }
    useEffect(()=>{
        props.onProfileUpdate(image);
    },[image])
    return(
        <View style={{flex:1, alignItems:"center",justifyContent:"center", paddingVertical:10}}>
            
            <View style={{paddingBottom:10}}>
            {image && <Image source={{uri: image}} style={{width:100,height:100, borderRadius:50}} />} 
            </View> 
            <Button title="Pick Profile Image"  onPress={pickImage}/>
        </View>
    )
}

export default ProfilePicPicker;