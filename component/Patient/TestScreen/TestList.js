import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { List } from "react-native-paper";
const testList = [
  {
    id: 1,
    testResultStatue: "Pending",
    date: "2022-06-01",
  },
  {
    id: 2,
    testResultStatue: "In Progress",
    date: "2022-06-01",
  },
  {
    id: 3,
    testResultStatue: "Received",
    date: "2022-05-05",
  },
];

const TestList = (props) => {
  return (
    <FlatList
      data={testList}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <TouchableOpacity
            style={styles.listItem}
            activeOpacity={2.5}
            onPress={() => {
              props.navigation.navigate("Test Detailed");
            }}
          >
            <List.Item
              key={itemData.item.id}
              style={{ height: 80 }}
              title={itemData.item.date}
              description={`Test Result: ${itemData.item.testResultStatue}`}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 10,
    borderRadius: 20,
    borderColor: "black",
    backgroundColor: "#EDD2F3",
  },
});
export default TestList;
