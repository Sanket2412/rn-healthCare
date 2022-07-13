import React, { useEffect, useReducer, useRef, useState } from "react";
import { Button } from "react-native-paper";
import { StyleSheet, View, Text, TextInput } from "react-native";
const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";
const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const inputRef=useRef();
  useEffect(()=>{
    if(props.clear)
    {
      inputRef.current.clear();
    }
  },[props.clear])
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });
  const [showPassword, setShowPassword]=useState(false);
  const textChangeHandler = (text) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const numberRegex=/\d/;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if(props.onlyNum && specialChars.test(text))
    {
      isValid=false;
    }
    if(props.phone && (specialChars.test(text) || text.length !==10))
    {
      isValid=false;
    }
    if(props.onlyAlpha && (numberRegex.test(text) || specialChars.test(text)))
    {
      isValid=false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };
  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };
  const { onInputChange, id } = props;
  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={props.password ? styles.passwordContainer : null}>
      <TextInput
        style={!props.password ? styles.input: styles.passwordInput}
        {...props}
        secureTextEntry={!props.password ? false : !showPassword }
        onBlur={lostFocusHandler}
        value={inputState.value}
        onChangeText={textChangeHandler}
        keyboardAppearance="default"
        ref={inputRef}
      />
      {props.password ? <Button  color="black" icon={showPassword ? "eye": "eye-off"} onPress={()=>{ setShowPassword(!showPassword)}}/>: null}</View>
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  passwordContainer:{
    flexDirection:"row",
    paddingLeft: 22,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    justifyContent:"space-evenly",
    alignItems:"flex-start"
  },
  passwordInput:{
    width:"100%",
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
});
export default Input;
