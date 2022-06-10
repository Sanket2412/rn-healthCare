import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
const prescriptionList = [
  {
    id: 1,
    date: new Date().toString(),
  },
  {
    id: 2,
    date: "2022-06-01",
  },
  {
    id: 3,
    date: "2022-05-05",
  },
];

const PrescriptionList = (props) => {
  const onPressHandler=()=>{
      props.navigation.navigate('Details');
  }
  return (
    <FlatList
      data={prescriptionList}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <TouchableOpacity
            style={styles.listItem}
            onPress={onPressHandler}
          >
            <List.Item
              key={itemData.item.id}
              style={{ height: 80 }}
              titleStyle={{ textAlign: "left" }}
              title={new Date(itemData.item.date).toDateString()}
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
export default PrescriptionList;
