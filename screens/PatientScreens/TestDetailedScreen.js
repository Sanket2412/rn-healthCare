import React from "react";
import { ImageBackground, Text } from "react-native";
import { background } from "../../constant/constants";
const TestDetailedScreen = () => {
  return (
    <ImageBackground
      source={{ uri: background }}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Test Detailed Screen</Text>
    </ImageBackground>
  );
};
export default TestDetailedScreen;
