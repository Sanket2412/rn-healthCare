import React, { useEffect, useState } from "react";
import { Button, Snackbar } from "react-native-paper";
import { Image, View, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { defaultAvatar } from "../../constant/constants";
import * as Firebase from "firebase";
import { firebaseConfig } from "../../config/config";

const ProfilePicPicker = (props) => {
  const [image, setImage] = useState(defaultAvatar);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const uploadImage = async () => {
    if (!Firebase.apps.length) {
      Firebase.initializeApp(firebaseConfig);
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
          setUploadSuccess(true);
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
    if(image === defaultAvatar)
    {
      props.onProfileUpdate(null,isUploading);
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
      <Snackbar
        visible={uploadSuccess}
        duration={5000}
        onDismiss={() => {
          setUploadSuccess(false);
        }}
        action={{
          label: "Undo",
          onPress: () => {
            setUploadSuccess(false);
          },
        }}
      >
        Image Uploaded Successfully
      </Snackbar>
      <View style={{ paddingBottom: 10 }}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </TouchableOpacity>
      </View>
      <Button
        mode="contained"
        loading={isUploading}
        color="lightblue"
        style={{ color: "white" }}
        disabled={image === defaultAvatar}
        onPress={uploadImage}
      >
        {!isUploading ? "Upload Pic" : null}
      </Button>
    </View>
  );
};

export default ProfilePicPicker;
