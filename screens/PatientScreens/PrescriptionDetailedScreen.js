import React from "react";
import { Text, ImageBackground } from "react-native";
import { background } from "../../constant/constants";
const PrescriptionDetailedScreen = (props) => {
  return (
    <ImageBackground
      source={{ uri: background }}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Prescription Detailed Screen</Text>
    </ImageBackground>
  );
};
export default PrescriptionDetailedScreen;
