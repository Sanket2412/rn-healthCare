import React, { useState, useReducer, useCallback } from "react";
import { ImageBackground, StyleSheet, ScrollView, Alert, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Card, Button, Snackbar, Checkbox, Subheading } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { background } from "../../constant/constants";
import Input from "../../component/UI/Input";
import PrescriptionPicPicker from "../../component/UI/PrescriptionPicPicker";
import { addPrescription } from "../../store/actions/prescription";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AddPrescriptionScreen = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [isTest, setIsTest] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [precriptionImages, setPrescriptionImages] = useState([]);
  const [clearData, setClearData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const [patientId, setPaientId] = useState("");
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      dosageDays: "",
      note: "",
      visitReason: "",
      weight: "",
    },
    inputValidities: {
      dosageDays: false,
      note: false,
      visitReason: false,
      weight: false,
    },
    formIsValid: false,
  });
  const onAddPrescriptionHandler = () => {
    if (patientId.length === 0) {
      setError({ isError: true, message: "Please Select Patient!" });
      return;
    }
    setIsLoading(true);
    let prescriptionData = {
      userId: patientId,
      dosageDays: formState.inputValues.dosageDays,
      weight: formState.inputValues.weight,
      date: new Date(),
      preacriptionType: isTest ? "test" :"prescription",
      images: precriptionImages,
      visitReason: formState.inputValues.visitReason,
      note: formState.inputValues.note,
    };
    try {
      dispatch(addPrescription(prescriptionData));
      setSuccess(true);
      setIsLoading(false);
      reset();
    } catch (error) {
      setIsLoading(false);
      setError({ isError: true, message: error });
    }
  };
  const onResetClickHandler = () => {
    Alert.alert("Are You Sure", "Are You Cancel Prescription", [
      {
        text: "Yes",
        onPress: () => {
          reset();
          props.navigation.navigate("Home");
        },
      },
      {
        text: "No",
      },
    ]);
  };
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );
  let dropItems = [];
  users.forEach((element) => {
    if (element.userType === "patient") {
      dropItems.push({ label: element.name, value: element.key });
    }
  });
  const reset = () => {
    setPaientId("");
    setIsTest(false);
    setClearData(true);
  };
  const prescriptionPicUpdateHandler = (urls, uploadingStatus) => {
    setIsUploading(uploadingStatus);
    setPrescriptionImages(urls);
  };
  return (
    <ImageBackground
      source={{ uri: background }}
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
    >
      <Snackbar
        visible={error.isError || success}
        duration={5000}
        onDismiss={() => {
          success
            ? setSuccess(false)
            : setError({ isError: false, message: "" });
        }}
        action={{
          label: "Undo",
          onPress: () => {
            success
              ? setSuccess(false)
              : setError({ isError: false, message: "" });
          },
        }}
      >
        {success ? "Prescription Sent To Patient" : error.message}
      </Snackbar>
      <Card elevation={30} style={styles.cardConatiner}>
        <Card.Title
          title="ADD PRESCRIPTION"
          titleStyle={{ color: "green", textAlign: "left", fontSize: 25 }}
        />
        <DropDownPicker
          style={{ marginVertical: 15, width: "100%" }}
          open={openDrop}
          value={patientId}
          items={dropItems}
          setValue={setPaientId}
          setOpen={setOpenDrop}
        />

        <ScrollView>
          <Card.Content>
            <View style={{ marginVertical:20,flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <Subheading>Test</Subheading>
            <Checkbox
              status={isTest ? "checked" : "indeterminate"}
              onPress={() => {
                setIsTest(!isTest);
              }}
            /></View>
            <Input
              label="Dosage Days"
              id="dosageDays"
              onlyNum
              keyboardType="number-pad"
              required
              min={2}
              errorText="Please Enter Valid Number"
              onInputChange={inputChangeHandler}
              clear={clearData}
            />
            <Input
              label="Patient Weight"
              id="weight"
              onlyNum
              keyboardType="number-pad"
              required
              min={30}
              errorText="Please Enter Valid Weight"
              onInputChange={inputChangeHandler}
              clear={clearData}
            />
            <Input
              label="Patient Visit Reason"
              id="visitReason"
              keyboardType="default"
              errorText="Please Enter Valid Reason"
              onInputChange={inputChangeHandler}
              clear={clearData}
            />
            <Input
              label="Note"
              id="note"
              keyboardType="default"
              required
              minLength={10}
              errorText="Please Enter Valid Note"
              onInputChange={inputChangeHandler}
              clear={clearData}
            />
            <PrescriptionPicPicker
              navigation={props.navigation}
              onImagesUpdate={prescriptionPicUpdateHandler}
              clear={clearData}
            />
          </Card.Content>
          <Card.Actions style={styles.cardAction}>
            <Button
              mode="contained"
              disabled={
                !formState.formIsValid ||
                isUploading ||
                precriptionImages.length === 0
              }
              loading={isLoading}
              color="green"
              style={{ width: 100, marginVertical: 10 }}
              onPress={onAddPrescriptionHandler}
            >
              {isLoading ? null : "Add"}
            </Button>
            <Button
              mode="contained"
              color="red"
              disabled={isUploading}
              style={{ width: 100, marginVertical: 10 }}
              onPress={onResetClickHandler}
            >
              Cancel
            </Button>
          </Card.Actions>
        </ScrollView>
      </Card>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  cardConatiner: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 400,
    borderRadius: 30,
    maxHeight: 550,
    padding: 20,
  },
  cardAction: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default AddPrescriptionScreen;
