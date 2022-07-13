import React, { useEffect, useState } from "react";
import { ActivityIndicator, Caption, IconButton } from "react-native-paper";
import { Modal, View } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import * as ImagePicker from "expo-image-picker";
import * as Firebase from "firebase";
import { firebaseConfig } from "../../config/config";

const PrescriptionPicPicker = (props) => {
  const [image, setImage] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isViewButton, setIsViewButton] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const uploadImage = () => {
    let imageUrls = [];
    if (!Firebase.apps.length) {
      Firebase.initializeApp(firebaseConfig);
    }
    image.forEach(async (element) => {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = () => {
          reject(new TypeError("Network Request Failed!"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", element, true);
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
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then((downloadUrl) => {
            imageUrls.push(downloadUrl);
            setIsUploading(false);
            setImage(imageUrls);
            blob.close();
          });
        }
      );
    });
  };

  async function pickImage() {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });
    if (!result.cancelled) {
      let img = image;
      img.push(result.uri);
      setImage(img);
      setIsViewButton(true);
    }
  }
  useEffect(()=>{
    if(props.clear)
    {
      setImage([]);
      setIsViewButton(false);
    }
  },[props.clear])
  useEffect(() => {
    if (image.length === 0) {
      props.onImagesUpdate([], isUploading);
    } else if (image[0].startsWith("file://")) {
      props.onImagesUpdate([], isUploading);
    } else {
      props.onImagesUpdate(image, isUploading);
    }
  }, [image, isUploading]);
  let img = [];
  image.forEach((element) => {
    img.push({ url: element });
  });
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
      }}
    >
      {!isViewButton && (
        <Caption style={{ color: "red" }}>
          *Note: Please Click Multiple Images for Preview
        </Caption>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isViewButton && (
          <IconButton
            icon="image-album"
            color="green"
            size={35}
            onPress={() => {
              setViewImage(true);
            }}
          />
        )}
        <IconButton
          icon="camera"
          color="lightblue"
          size={35}
          onPress={pickImage}
        />
        {!isUploading ? (
          <IconButton
            icon="file-upload"
            size={35}
            loading={isUploading}
            color="orange"
            disabled={!isViewButton}
            onPress={uploadImage}
          />
        ) : null}
        <ActivityIndicator animating={isUploading} color="lightblue" />
      </View>
      <Modal
        visible={viewImage}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setViewImage(false);
        }}
      >
        <ImageViewer
          imageUrls={img}
          renderIndicator={() => null}
          pageAnimateTime={1000}
        />
      </Modal>
    </View>
  );
};

export default PrescriptionPicPicker;
