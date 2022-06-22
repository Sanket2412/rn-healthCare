import React,{ useEffect } from "react";
import AppNavigator from "./navigation/AppNavigator";
import { LogBox } from "react-native";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/reducers/auth";
import users from "./store/reducers/users";
const rootReducer=combineReducers({
  auth:authReducer,
  user:users,
});
const store=configureStore({reducer:rootReducer},applyMiddleware(ReduxThunk))
export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(["Animated:`useNativeDriver`"]);
    LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
    LogBox.ignoreLogs(["componentWillReceiveProps has been renamed, and is not recommended for use."]);
    LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);
  }, [LogBox]);
  
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
