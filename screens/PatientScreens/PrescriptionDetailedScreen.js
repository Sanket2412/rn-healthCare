import React from "react";
import {
  Text,
  ImageBackground,
  ScrollView,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { background } from "../../constant/constants";
const PrescriptionDetailedScreen = (props) => {
  const selectedPrescription = props.route.params.prescription;
  return (
    <ImageBackground
      source={{ uri: background }}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ScrollView style={{ marginVertical: 30 }}>
        <Image
          style={styles.image}
          source={{ uri: selectedPrescription.imageUrl }}
        />
        <View style={styles.description}>
          <Text>
            Prescription Date:{" "}
            {new Date(selectedPrescription.date).toDateString()}
          </Text>
          <Text>No. of Days Dosage: {selectedPrescription.dosage} </Text>
          <Text>Note: {selectedPrescription.note}</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  description: {
    marginVertical: 10,
    alignItems: "center",
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 20,
  },
});
export default PrescriptionDetailedScreen;
