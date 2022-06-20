import React, {
  useReducer,
  useEffect,
  useCallback,
  useState,
  Fragment,
} from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Button, Snackbar } from "react-native-paper";
import Input from "../../component/UI/Input";
import { Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import * as userActions from "../../store/actions/users";
import { ImageBackground } from "react-native";
import { background } from "../../constant/constants";
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
const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword]=useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();
  const defaultValues = isSignup
    ? {
        inputValues: {
          email: "",
          password: "",
          age: 0,
          name: "",
          phone: "",
          address: "",
        },
        inputValidities: {
          email: false,
          password: false,
          age: false,
          name: false,
          phone: false,
          address: false,
        },
        formIsValid: false,
      }
    : {
        inputValues: {
          email: "",
          password: "",
        },
        inputValidities: {
          email: false,
          password: false,
        },
        formIsValid: false,
      };
  const [formState, dispatchFormState] = useReducer(formReducer, defaultValues);
  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setIsError(true);
      setError(err.message);
      setIsLoading(false);
    }
    if (isSignup && !isError) {
      await dispatch(
        userActions.addUser({
          name: formState.inputValues.name,
          age: formState.inputValues.age,
          phone: formState.inputValues.phone,
          bloodGroup: "B+",
          email: formState.inputValues.email,
          address: formState.inputValues.address,
        })
      );
    }
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
  return (
    <ImageBackground source={{ uri: background }} style={styles.screen}>
      <Snackbar
        visible={isError}
        duration={5000}
        onDismiss={() => {
          setIsError(false);
          setError(null);
        }}
        action={{
          label: "Undo",
          onPress: () => {
            setIsError(false);
            setError(null);
          },
        }}
      >
        {error}
      </Snackbar>
      <View style={styles.cardContainer}>
        <Card elevation={50} style={styles.authContainer}>
        <Card.Title title={isSignup ? "Sign In": "Login"} titleStyle={{color:"green", textAlign:"left",fontSize:30}}/>
        <ScrollView>
          <Card.Content>
              {isSignup ? (
                <Fragment>
                  <Input
                    id="name"
                    label="Name"
                    onlyAlpha
                    keyboardType="default"
                    required
                    minLength={3}
                    autoCapitalize="words"
                    errorText="Please Enter Valid Name"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                  />
                  <Input
                    id="age"
                    label="Age"
                    onlyNum
                    min={5}
                    max={100}
                    keyboardType="number-pad"
                    required
                    errorText="Please Enter Valid Age(5-100)"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                  />
                  <Input
                    id="phone"
                    label="Phone"
                    phone
                    keyboardType="number-pad"
                    required
                    errorText="Please Enter Valid 10 Digit Phone Number"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                  />
                  <Input
                    id="address"
                    label="Address"
                    multiline
                    minLength={30}
                    keyboardType="default"
                    required
                    errorText="Please Enter min 30 characters Address"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                  />
                </Fragment>
              ) : null}
              <Input
                id="email"
                label="E-Mail"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please Enter Valid Email Address!"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry={!showPassword}
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Please Enter a Valid Password"
                onInputChange={inputChangeHandler}
                initialValue=""
              /><Button color="black" icon={showPassword ? "eye": "eye-off"} onPress={()=>{ setShowPassword(!showPassword)}}/>
            
          <Card.Actions style={styles.cardAction}>
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Button
                mode="contained"
                color="green"
                disabled={!formState.formIsValid}
                style={{ width: 165, marginBottom: 10 }}
                onPress={authHandler}
              >
                {isSignup ? "Signup" : "Login"}
              </Button>
            )}
            <Button
              mode="contained"
              color="orange"
              style={{ width: 165, marginBottom: 10 }}
              onPress={() => {
                setIsSignup((prevState) => !prevState);
              }}
            >
              {`Switch to ${isSignup ? "Login" : "Sign Up"}`}
            </Button>
          </Card.Actions>
          </Card.Content>
          </ScrollView>
        </Card>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    borderRadius: 30,
    maxHeight: 600,
    padding: 20,
  },
  cardAction: {
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default AuthScreen;