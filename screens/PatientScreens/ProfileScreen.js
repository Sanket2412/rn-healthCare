import React, { Fragment, useState, useReducer, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { List, Snackbar } from "react-native-paper";
import {
  updateUser,
  fetchUsers,
  handlerAddFamilyMember,
  handlerRemoveFamilyMember,
} from "../../store/actions/users";
import { background, defaultAvatar } from "../../constant/constants";
import ProfilePicPicker from "../../component/UI/ProfilePicPicker";
import { Card, Avatar, Button } from "react-native-paper";
import Input from "../../component/UI/Input";
import InfoView from "../../component/UI/InfoView";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const CLEAR_EMAILS="CLEAR_EMAILS";
const { height } = Dimensions.get("window");
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
  if(action.type === CLEAR_EMAILS)
  {
    return {
      formIsValid: state.formIsValid,
      inputValidities: state.inputValidities,
      inputValues:{...state.inputValues, familyEmails:""}
    }
  }
  return state;
};
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [updateSuccess,setUpdateSuccess]=useState(false)
  const [addFamilyError, setAddFamilyError] = useState({
    isError: false,
    message: "",
  });
  const [addFamilyMember, setAddFamilyMember] = useState(false);
  const user = useSelector((state) => state.user.loggedInUser);
  const users = useSelector((state) => state.user.users);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      age: user.age,
      name: user.name,
      bloodGroup: user.name,
      phone: user.phone,
      address: user.address,
      familyEmails: "",
    },
    inputValidities: {
      age: true,
      bloodGroup: true,
      name: true,
      phone: true,
      address: true,
      familyEmails: true,
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
  const onUpdateClickHandler = () => {
    let updatedData = {};
    if (formState.inputValues.familyEmails.length > 0) {
      let addFamilyArray = [];
      let emailArray = formState.inputValues.familyEmails.split(",");
      for (let i = 0; i < emailArray.length; i++) {
        if (user.familyMembers && user.familyMembers.includes(emailArray[i])) {
          setAddFamilyError({
            isError: true,
            message: ` ${emailArray[i]} is Already Added`,
          });
          return;
        }
        let contians = users.findIndex((item) => item.email === emailArray[i]);
        if (emailArray[i] === user.email) {
          setAddFamilyError({
            isError: true,
            message: `Please Remove You Email Id`,
          });
          return;
        }
        if (contians === -1) {
          setAddFamilyError({
            isError: true,
            message: ` ${emailArray[i]} Does Not Exists`,
          });
          return;
        }
        addFamilyArray.push({
          key: users[contians].key,
          email: emailArray[i],
          familyMembers: users[contians].familyMembers
            ? users[contians].familyMembers
            : [],
        });
      }
      dispatch(handlerAddFamilyMember(user.email, addFamilyArray));
      updatedData.familyMembers = user.familyMembers
        ? user.familyMembers.concat(...emailArray)
        : emailArray;
    }
    if (
      formState.inputValues.name === user.name &&
      formState.inputValues.age === user.age &&
      formState.inputValues.phone === user.phone &&
      formState.inputValues.address === user.address &&
      profilePic === user.profilePic &&
      !updatedData.familyMembers
    ) {
      setIsEdit(false);
      return;
    } else if (formState.inputValues.name !== user.name) {
      updatedData.name = formState.inputValues.name;
    } else if (formState.inputValues.age !== user.age) {
      updatedData.age = formState.inputValues.age;
    } else if (formState.inputValues.phone !== user.phone) {
      updatedData.phone = formState.inputValues.phone;
    } else if (formState.inputValues.address !== user.address) {
      updatedData.address = formState.inputValues.address;
    } else if (profilePic !== user.profilePic) {
      updatedData.profilePic = profilePic;
    }
    dispatchFuntion(updatedData);
    setIsEdit(false);
    setAddFamilyMember(false);
  };
  const dispatchFuntion = (updatedData) => {
    try {
      dispatch(updateUser(user.key, updatedData));
      dispatchFormState({type:CLEAR_EMAILS});
      setUpdateSuccess(true);
      setTimeout(()=>{
        dispatch(fetchUsers());
      },3000);
    } catch (error) {
      console.log(error);
    }
  };
  const onRemoveMemberHandler = (email) => {
    const removingMemberData = users.find((item) => item.email === email);
    let updatedData = {};
    let filteredFamilyMember = removingMemberData.familyMembers.filter(
      (item) => item !== user.email
    );
    updatedData.familyMembers =
      filteredFamilyMember === undefined ? [] : filteredFamilyMember;
    updatedData.key = removingMemberData.key;
    let updateLoggedInUser = {};
    let filteredFM = user.familyMembers.filter((item) => item !== email);
    updateLoggedInUser.familyMembers = filteredFM.length > 0 ? filteredFM : [];
    Alert.alert(
      "Are You Sure?",
      "Are you Sure,You Want To Remove This Family Member",
      [
        {
          text: "Yes",
          onPress: () => {
            dispatch(handlerRemoveFamilyMember(updatedData));
            dispatchFuntion(updateLoggedInUser);
          },
        },
        {
          text: "No",
        },
      ]
    );
  };
  const onCancelClickHandler = () => {
    Alert.alert("Are You Sure?", "Are You Sure, You Can Lose Updated Data", [
      {
        text: "Yes",
        onPress: () => {
          setIsEdit(false);
          if (profilePic === defaultAvatar) {
            return;
          }
          if (profilePic !== user.profilePic) {
            dispatchFuntion({ profilePic: profilePic });
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
                {!user.familyMembers ? null : user.familyMembers.length > 0 ? (
                  <InfoView
                    label="Family Members"
                    value={user.familyMembers.join(", ")}
                  />
                ) : null}
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
                {!user.familyMembers ? null : user.familyMembers.length > 0 ? (
                  <Fragment>
                    <Text style={{ marginTop: 30 }}>Family Members</Text>
                    {user.familyMembers.map((element) => (
                      <List.Item
                        key={element}
                        style={{ height: 50 }}
                        title={element}
                        right={(props) => (
                          <TouchableOpacity
                            onPress={onRemoveMemberHandler.bind(this, element)}
                          >
                            <Avatar.Icon
                              style={{ backgroundColor: "white" }}
                              color="red"
                              size={50}
                              icon="delete-circle"
                            />
                          </TouchableOpacity>
                        )}
                      />
                    ))}
                  </Fragment>
                ) : null}
                {addFamilyMember && (
                  <Input
                    id="familyEmails"
                    label="Enter Family E-Mails Sperated By ,"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    errorText="Please Enter Valid Email Address!"
                    onInputChange={inputChangeHandler}
                    initialValue={formState.inputValues.familyEmails}
                  />
                )}
                {!addFamilyMember && (
                  <Button
                    mode="contained"
                    color="lightblue"
                    onPress={() => {
                      setAddFamilyMember(true);
                    }}
                  >
                    Add Family Member
                  </Button>
                )}
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
            <Snackbar
            visible={addFamilyError.isError || updateSuccess}
            duration={7000}
            onDismiss={() => {
              setUpdateSuccess(false);
              setAddFamilyError({ isError: false, message: "" });
            }}
            wrapperStyle={{
              top: height - 250,
            }}
            action={{
              label: "Close",
              onPress: () => {
                setUpdateSuccess(false);
                setAddFamilyError({ isError: false, message: "" });
              },
            }}
          >
            {updateSuccess ? "Data Updated Successfully" : addFamilyError.message}
          </Snackbar>
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
