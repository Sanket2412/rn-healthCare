import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { Image, View, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { defaultAvatar } from "../../constant/constants";
import * as Firebase from "firebase";
import { firebaseConfig } from "../../config/config";

const ProfilePicPicker = (props) => {
  let defaultPic="";
  if(props.defaultPic)
  {
    defaultPic=props.defaultPic;
  }
  else
  {
    defaultPic=defaultAvatar
  }
  const [image, setImage] = useState(defaultPic);
  const [isUploading, setIsUploading] = useState(false);
  const uploadImage = async () => {
    if (!Firebase.apps.length) {
      Firebase.initializeApp(firebaseConfig);
    }
    if(props.update)
    {
      if(image === props.defaultPic)
      {
        return;
      }
      console.log(props.defaultPic);
      const deleteRef= Firebase.storage().refFromURL(props.defaultPic);
      deleteRef.delete().then(function(){
        console.log("File Deleted");
      }).catch(function (error){
        console.log(error);
      });
    }
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network Request Failed!"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const ref = Firebase.storage().ref().child(new Date().toISOString());
    const snapshot = ref.put(blob);
    snapshot.on(
      Firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setIsUploading(true);
      },
      (error) => {
        setIsUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          setIsUploading(false);
          setImage(downloadUrl);
          blob.close();
          return downloadUrl;
        });
      }
    );
  };

  async function pickImage() {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }
  useEffect(() => {
    if(image.startsWith("file://"))
    {
      props.onProfileUpdate(defaultAvatar,isUploading);
    }
    else
    {
      props.onProfileUpdate(image, isUploading);
    }
  }, [image]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
      }}
    >
      <View style={{ paddingBottom: 10 }}>
        <TouchableOpacity onPress={pickImage} disabled={props.update ? !props.isEdit : false }>
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </TouchableOpacity>
      </View>
      {!props.update ? <Button
        mode="contained"
        loading={isUploading}
        color="lightblue"
        style={{ color: "white" }}
        disabled={image === defaultAvatar}
        onPress={uploadImage}
      >
        {!isUploading ? "Upload Pic" : ""}
      </Button> : props.isEdit ? <Button
        mode="contained"
        loading={isUploading}
        color="orange"
        style={{ color: "white" }}
        disabled={image === defaultAvatar}
        onPress={uploadImage}
      >
        {!isUploading ? "Upload Pic" : ""}
      </Button> : null}
    </View>
  );
};

export default ProfilePicPicker;
