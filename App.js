import React, { useEffect } from "react";
import AppNavigator from "./navigation/AppNavigator";
import { LogBox } from "react-native";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/reducers/auth";
import userReducer from "./store/reducers/users";
import 'react-native-gesture-handler';
import appointmentReducer from "./store/reducers/appointment";
import prescriptionReducer from "./store/reducers/prescription";
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  appointment: appointmentReducer,
  prescription: prescriptionReducer,
});
const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  },
  applyMiddleware(ReduxThunk)
);
export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(["Animated:`useNativeDriver`"]);
    LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
    LogBox.ignoreLogs([
      "componentWillReceiveProps has been renamed, and is not recommended for use.",
    ]);
    LogBox.ignoreLogs([
      "AsyncStorage has been extracted from react-native core",
    ]);
  }, [LogBox]);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
