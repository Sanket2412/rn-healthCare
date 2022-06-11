import React from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { List } from "react-native-paper";
const testList = [
  {
    id: 1,
    testResultStatus: "Pending",
    date: "2022-06-01",
    imageUrl:
      "https://www.researchgate.net/profile/Sandra-Benavides/publication/228331607/figure/fig4/AS:667613038387209@1536182760366/Indicate-why-the-prescription-is-not-appropriate-as-written_Q640.jpg",
  },
  {
    id: 2,
    testResultStatus: "In Progress",
    imageUrl:
      "https://www.klippa.com/wp-content/uploads/2020/12/medical-prescription-ocr.png",
    date: "2022-06-01",
  },
  {
    id: 3,
    testResultStatus: "Received",
    imageUrl:
      "https://www.researchgate.net/publication/345830022/figure/fig4/AS:957640029003789@1605330583881/Sample-prescription-used-as-input-to-the-GUI-developed-in-the-present-work.png",
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
              props.navigation.navigate("Test Detailed", {
                prescription: { ...itemData.item },
              });
            }}
          >
            <List.Item
              key={itemData.item.id}
              style={{ height: 80 }}
              title={itemData.item.date}
              description={`Test Result: ${itemData.item.testResultStatus}`}
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
