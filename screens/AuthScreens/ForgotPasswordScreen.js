import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";
import { Button, Card, Snackbar } from "react-native-paper";
import Input from "../../component/UI/Input";
import { background } from "../../constant/constants";
import { API_KEY } from "../../config/config";
const ForgotPasswordScreen = (props) => {
  const [emailValue, setEmailValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [linkSendingValidity, setlinkSendingValidity] = useState({
    error: "",
    isError: false,
    isSuccess: false,
  });
  const [emailValidity, setEmailValidity] = useState(false);
  const inputChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
    setEmailValue(inputValue);
    setEmailValidity(inputValidity);
  };
  const onResetPressHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailValue,
          }),
        }
      );

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = errorId.replace(/_/gi, " ");
        throw new Error(message);
      }
      setlinkSendingValidity({
        ...linkSendingValidity,
        isSuccess: true,
        error: "",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setlinkSendingValidity({
        ...linkSendingValidity,
        error: error.message,
        isError: true,
      });
    }
  };
  return (
    <ImageBackground
      source={{ uri: background }}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Snackbar
        visible={linkSendingValidity.isError || linkSendingValidity.isSuccess}
        duration={5000}
        onDismiss={() => {
          setlinkSendingValidity({
            error: "",
            isError: false,
            isSuccess: false,
          });
          if (linkSendingValidity.isSuccess) {
            props.navigation.goBack();
          }
        }}
        action={{
          label: "Undo",
          onPress: () => {
            setlinkSendingValidity({
              error: "",
              isError: false,
              isSuccess: false,
            });
            if (linkSendingValidity.isSuccess) {
              props.navigation.goBack();
            }
          },
        }}
      >
        {linkSendingValidity.isError
          ? linkSendingValidity.error
          : "Reset Password Sent on Email Successfully"}
      </Snackbar>
      <Card style={styles.authContainer}>
        <Card.Content>
          <Input
            id="email"
            label="E-mail"
            keyboardType="email-address"
            required
            autoCapitalize="none"
            email
            errorText="Enter Valid Email Id"
            onInputChange={inputChangeHandler}
            initailValue=""
          />
          <Card.Actions style={styles.cardAction}>
            <Button
              loading={isLoading}
              mode="contained"
              color="orange"
              onPress={onResetPressHandler}
              disabled={!emailValidity}
            >
              Reset Password
            </Button>
          </Card.Actions>
        </Card.Content>
      </Card>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
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
export default ForgotPasswordScreen;
