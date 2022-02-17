import React from "react";
import {View, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";

const EmergencyDetails = (props) => {
  return (
    <View style={{ width: "100%" }}>
      <Card elevation={20}>
        <Card.Content>
          <Title> DR SHAH</Title>
          <Paragraph>Address: Demo Address</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({});
export default EmergencyDetails;
