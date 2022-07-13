import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import {
  Button,
  Card,
  IconButton,
  List,
  Subheading,
  Title,
} from "react-native-paper";
import {
  printableHtmlHeader,
  printableHtmlFooter,
} from "../../constant/constants";
import { useDispatch, useSelector } from "react-redux";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { updateAppointment } from "../../store/actions/appointment";
const AppointmentList = (props) => {
  const dispatch=useDispatch();
  const [filteredList, setFilteredList] = useState([]);
  const [appointmentPrintList, setAppointmentPrintList] = useState([]);
  const appointments = useSelector((state) => state.appointment.appointments);
  useEffect(() => {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    let filteredAppointmentList = [];
    if (appointments.length > 0) {
      filteredAppointmentList = appointments.filter((element) => {
        let elementDate = new Date(element.bookedDate);
        return (
          element.enabled === true &&
          todayDate.getDate() === elementDate.getDate() &&
          todayDate.getMonth() === elementDate.getMonth() &&
          todayDate.getFullYear() === elementDate.getFullYear() &&
          element.status === "pending"
        );
      });
    }
    if (filteredAppointmentList.length > 1) {
      filteredAppointmentList.sort(
        (a, b) =>
          new Date(a.bookingCreatedDate).getTime() -
          new Date(b.bookingCreatedDate).getTime()
      );
    }
    setFilteredList(filteredAppointmentList);
    setAppointmentPrintList(filteredAppointmentList);
  }, [appointments]);
  const onListButtonClickHandler=(id,buttonType)=>{
    const updatedList=filteredList.filter(item => item.key !== id);
    dispatch(updateAppointment(id,buttonType));
    setFilteredList(updatedList);
  }
  const handlePrint = async () => {
    let html = `${printableHtmlHeader}
          <h2 style="text-align:center">Today's Appointment List</h2>
          <div style="display:flex;flex-direction:row;justify-content:center;align-items=center;margin:20">
            <table border="1">
                <thead>
                    <tr>
                    <th>Sr.No</th>
                    <th>Patient Name</th>
                    <th>Appointment Booked Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${appointmentPrintList.map((item, index) => {
                      return `<tr key=${index}>
                            <td>${index + 1}</td>
                            <td>${item.patientName}</td>
                            <td>${new Date(
                              item.bookingCreatedDate
                            ).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}</td>
                            </tr>`;
                    })}
                </tbody>
            </table>
          </div>
          ${printableHtmlFooter}`;

    const { uri } = await Print.printToFileAsync({
      html,
    });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };
  return (
    <View style={styles.content}>
      <Card elevation={20} style={{ borderRadius: 15 }}>
        <Card.Title
          title="Today's Appointments"
          style={styles.cardTitle}
          titleStyle={{
            color: "white",
            alignSelf: "center",
          }}
        />
        {filteredList.length === 0 && (
          <Card.Content>
            <View
              style={{
                height: "80%",
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Title>No Appointments Booked Today </Title>
            </View>
          </Card.Content>
        )}
        {filteredList.length > 0 && (
          <FlatList
            data={filteredList}
            keyExtractor={(item) => item.key}
            renderItem={(itemData) => {
              return (
                <View key={itemData.item.key}>
                  <Card.Content key={itemData.item.key}>
                    <List.Item
                      key={itemData.item.key}
                      style={{ height: 80 }}
                      title={itemData.item.patientName}
                      right={(props) => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-evenly",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              icon="check"
                              color="green"
                              size={25}
                              onPress={onListButtonClickHandler.bind(this,itemData.item.key,"visited")}
                            />
                            <IconButton
                              icon="selection-ellipse-remove"
                              color="red"
                              size={25}
                              onPress={onListButtonClickHandler.bind(this,itemData.item.key,"not visited")}
                            />
                          </View>
                        );
                      }}
                    />
                  </Card.Content>
                </View>
              );
            }}
          />
        )}
        {filteredList.length > 0 && (
          <Card.Actions
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              labelStyle={{ fontSize: 25, color: "red" }}
              icon="file-pdf-box"
              mode="contained"
              color="lightblue"
              onPress={handlePrint}
            >
              <Subheading>Download Appointment List</Subheading>
            </Button>
          </Card.Actions>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: "100%",
    padding: 15,
  },
  cardTitle: {
    borderRadius: 15,
    backgroundColor: "#039dfc",
  },
});

export default AppointmentList;
