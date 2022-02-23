import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Linking,
  Platform,
} from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
const Doctor = {
  name: "🧑‍⚕️Dr. Shah",
  phoneNumber: 9988775566,
  clinicAddress: "🏥Demo Address Near Demo Road!",
};
const EmergencyDetails = (props) => {
  const dialCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = `tel:${Doctor.phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${Doctor.phoneNumber}`;
    }

    Linking.openURL(phoneNumber);
  };
  return (
    <View style={styles.content}>
      <Card elevation={10}>
        <Card.Title
          title="🚨FOR EMERGENCY🚨"
          titleStyle={styles.titleText}
          style={styles.title}
        />
        <Card.Content>
          <Title>{Doctor.name}</Title>
          <Title>{Doctor.clinicAddress}</Title>
        </Card.Content>
        <TouchableHighlight
          style={{ backgroundColor: "#02b32e" }}
          onPress={dialCall}
        >
          <Text>CALL</Text>
        </TouchableHighlight>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    margin: 20,
    backgroundColor: "#039dfc",
  },
  titleText: {
    textAlign: "center",
    color: "white",
  },
  title: {
    backgroundColor: "#fc4444",
    padding: 5,
  },
});
export default EmergencyDetails;
