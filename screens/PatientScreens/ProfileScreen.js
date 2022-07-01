import React, { Fragment, useState, useReducer, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { updateUser, fetchUsers } from "../../store/actions/users";
import { background, defaultAvatar } from "../../constant/constants";
import ProfilePicPicker from "../../component/UI/ProfilePicPicker";
import { Card, Avatar, Button } from "react-native-paper";
import Input from "../../component/UI/Input";
import InfoView from "../../component/UI/InfoView";
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
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const user = useSelector((state) => state.user.loggedInUser);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      age: user.age,
      name: user.name,
      bloodGroup: user.name,
      phone: user.phone,
      address: user.address,
    },
    inputValidities: {
      age: true,
      bloodGroup: true,
      name: true,
      phone: true,
      address: true,
    },
    formIsValid: true,
  });
  const profilePicUpdateHandler = (url, uploadingStatus) => {
    setIsUploading(uploadingStatus);
    setProfilePic(url);
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
  const onUpdateClickHandler=()=>{
    let updatedData={};
    if(formState.inputValues.name === user.name && formState.inputValues.age === user.age && formState.inputValues.phone === user.phone && formState.inputValues.address === user.address && profilePic=== user.profilePic)
    {
      setIsEdit(false);
        return;
    }
    else if(formState.inputValues.name !== user.name)
    {
      updatedData.name=formState.inputValues.name;
    }
    else if(formState.inputValues.age !== user.age)
    {
      updatedData.age=formState.inputValues.age;
    }
    else if(formState.inputValues.phone !== user.phone)
    {
      updatedData.phone=formState.inputValues.phone;
    }
    else if(formState.inputValues.address !== user.address)
    {
      updatedData.address=formState.inputValues.address;
    }
    else if(profilePic !== user.profilePic)
    {
      updatedData.profilePic=profilePic;
    }
    dispatchFuntion(updatedData);
    setIsEdit(false);
  }
  const dispatchFuntion=(updatedData)=>{
    dispatch(updateUser(user.key,updatedData));
    dispatch(fetchUsers());
  }
  const onCancelClickHandler = () => {
    Alert.alert("Are You Sure?", "Are You Sure, You can Lose Updated Data", [
      {
        text: "Yes",
        onPress: () => {
          setIsEdit(false);
          if(profilePic === defaultAvatar)
          {
            return;
          }
          if(profilePic !== user.profilePic)
          {
            dispatchFuntion({ profilePic:profilePic})
          }
        },
      },
      {
        text: "No",
      },
    ]);
  };
  return (
    <ImageBackground
      source={{ uri: background }}
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
    >
      <Card elevation={50} style={styles.cardConatiner}>
        <Card.Title
          title="PROFILE"
          titleStyle={{ color: "green", textAlign: "left", fontSize: 30 }}
          right={(props) => (
            <TouchableOpacity
              onPress={() => {
                setIsEdit(!isEdit);
              }}
            >
              <Avatar.Icon
                style={{ backgroundColor: "white" }}
                color="green"
                {...props}
                size={64}
                icon={isEdit ? "" : "account-edit"}
              />
            </TouchableOpacity>
          )}
        />
        <ScrollView>
          <Card.Content>
            <ProfilePicPicker
              update
              isEdit={isEdit}
              defaultPic={user.profilePic}
              onProfileUpdate={profilePicUpdateHandler}
            />
            {!isEdit ? (
              <Fragment>
                <InfoView label="Name" value={user.name} />
                <InfoView label="Address" value={user.address} />
                <InfoView label="Email" value={user.email} />
                <InfoView label="Age" value={user.age} />
                <InfoView label="Phone" value={user.phone} />
                <InfoView label="Blood Group" value={user.bloodGroup} />
              </Fragment>
            ) : (
              <Fragment>
                <Input
                  label="Name"
                  id="name"
                  onlyAlpha
                  keyboardType="default"
                  required
                  minLength={3}
                  autoCapitalize="words"
                  errorText="Please Enter Valid Name"
                  onInputChange={inputChangeHandler}
                  initialValue={formState.inputValues.name}
                  initiallyValid={formState.inputValidities.name}
                />
                <Input
                  label="Address"
                  id="address"
                  multiline
                  minLength={30}
                  keyboardType="default"
                  required
                  errorText="Please Enter min 30 characters Address"
                  onInputChange={inputChangeHandler}
                  initialValue={formState.inputValues.address}
                  initiallyValid={formState.inputValidities.address}
                />
                <Input
                  label="Age"
                  id="age"
                  onlyNum
                  min={5}
                  max={100}
                  keyboardType="number-pad"
                  required
                  errorText="Please Enter Valid Age(5-100)"
                  onInputChange={inputChangeHandler}
                  initialValue={formState.inputValues.age}
                  initiallyValid={formState.inputValidities.age}
                />
                <Input
                  label="Phone"
                  id="phone"
                  phone
                  keyboardType="number-pad"
                  required
                  errorText="Please Enter Valid 10 Digit Phone Number"
                  onInputChange={inputChangeHandler}
                  initialValue={formState.inputValues.phone}
                  initiallyValid={formState.inputValidities.phone}
                />
                <Card.Actions style={styles.cardAction}>
                  <Button
                    mode="contained"
                    disabled={!formState.formIsValid || isUploading}
                    color="green"
                    style={{ width: 100, marginVertical: 10 }}
                    onPress={onUpdateClickHandler}
                  >
                    Update
                  </Button>
                  <Button
                    mode="contained"
                    disabled={isUploading}
                    color="red"
                    style={{ width: 100, marginVertical: 10 }}
                    onPress={onCancelClickHandler}
                  >
                    Cancel
                  </Button>
                </Card.Actions>
              </Fragment>
            )}
          </Card.Content>
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
export default ProfileScreen;
