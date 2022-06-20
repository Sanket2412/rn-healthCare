import React from "react";
import {  useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import NavigatorLoader from "./NavigatorLoader";
import StartupScreen from "../screens/StartupScreen";
import { AuthNavigator } from "./Navigators/stackNavigators";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => !!state.auth.didTryAutoLogin);
  return (
    <NavigationContainer>
      {isAuth && <NavigatorLoader />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};
export default AppNavigator;
