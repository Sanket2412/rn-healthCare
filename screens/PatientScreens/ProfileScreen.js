import React from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";
import { background } from "../../constant/constants";
const ProfileScreen = () => {
  return (
    <ImageBackground
      source={{ uri: background }}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Profile Screen</Text>
    </ImageBackground>
  );
};
export default ProfileScreen;