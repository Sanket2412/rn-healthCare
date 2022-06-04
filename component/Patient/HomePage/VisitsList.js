import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Button, Card, List } from "react-native-paper";

const appointmentList = [
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

const VisitsList = () => {
  let curr = new Date();
  curr.setHours(0,0,0,0);
  return (
    <View style={styles.content}>
      <Card elevation={20} style={{ borderRadius: 10 }}>
        <Card.Title
          title="Visit Log"
          style={styles.cardTitle}
          titleStyle={{
            color: "white",
            alignSelf: "center",
          }}
        />
        <FlatList
          data={appointmentList}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => {
              let title='';
              let itemDate= new Date(itemData.item.date);
              if(curr.getDate() === itemDate.getDate() && curr.getMonth() === itemDate.getMonth() && curr.getFullYear() === itemDate.getFullYear() )
              {
                  title="Appointment Sceduled Today"
              }
              else if(itemDate > curr)
              {
                title="Next Appointment Sceduled On"
              }
              else
              {
                  title="Visited On"
              }
              return(
            <View>
              <Card.Content>
                <List.Item
                  key={itemData.item.id}
                  style={{ height: 80 }}
                  title={title}
                  description={new Date(itemData.item.date).toDateString()}
                />
              </Card.Content>
            </View>)
          }}
        />
        <Card.Actions style={{flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
            <Button icon="calendar" mode="contained" color="green"> Book Appointment</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width:"100%",
    padding: 15,
  },
  cardTitle: {
    borderRadius: 15,
    backgroundColor:"#039dfc",
  },
});
export default VisitsList;
