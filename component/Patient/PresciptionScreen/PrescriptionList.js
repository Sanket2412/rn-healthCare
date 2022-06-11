import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
const prescriptionList = [
  {
    id: 1,
    date: new Date().toString(),
    imageUrl:"https://www.researchgate.net/profile/Sandra-Benavides/publication/228331607/figure/fig4/AS:667613038387209@1536182760366/Indicate-why-the-prescription-is-not-appropriate-as-written_Q640.jpg",
    dosage:10,
    note:"Stay At Home"
  },
  {
    id: 2,
    date: "2022-06-01",
    imageUrl:"https://www.klippa.com/wp-content/uploads/2020/12/medical-prescription-ocr.png",
    dosage:5,
    note:"Need to Take Rest, Stay Hydrated"
  },
  {
    id: 3,
    date: "2022-05-05",
    imageUrl:"https://www.researchgate.net/publication/345830022/figure/fig4/AS:957640029003789@1605330583881/Sample-prescription-used-as-input-to-the-GUI-developed-in-the-present-work.png",
    dosage:8,
    note:"Bed Rest Need"
  },
];

const PrescriptionList = (props) => {
  const onPressHandler=(id)=>{
      const prescription=prescriptionList.filter((item)=> item.id===id)
      const selectedPrescription= {...prescription[0]};
      props.navigation.navigate('Details',{ prescription:selectedPrescription});
  }
  return (
    <FlatList
      data={prescriptionList}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <TouchableOpacity
            style={styles.listItem}
            onPress={onPressHandler.bind(this,itemData.item.id)}
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
