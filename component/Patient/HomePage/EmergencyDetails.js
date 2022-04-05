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
  phoneNumber: 8087309626,
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
      <Card elevation={20} style={{ borderRadius: 10 }}>
        <Card.Content>
          <Card.Title
            title="🚨FOR EMERGENCY🚨"
            titleStyle={styles.titleText}
            style={styles.title}
          />
          <Title>{Doctor.name}</Title>
          <Title>{Doctor.clinicAddress}</Title>
        </Card.Content>
        <Card.Actions style={styles.action}>
          <View style={{ width: "100%" }}>
            <Button icon="phone" mode="contained" onPress={dialCall} style={styles.button}>
              Call
            </Button>
          </View>
        </Card.Actions>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    flex:1,
    margin: 15,
  },
  titleText: {
    textAlign: "center",
    color: "white",
  },
  title: {
    backgroundColor: "#fc4444",
    borderRadius: 10,
  },
  action: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  button: {
    backgroundColor: "green",
    borderRadius:10,
  },
});
export default EmergencyDetails;
