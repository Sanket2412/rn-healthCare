import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/reducers/auth";
const rootReducer=combineReducers({
  auth:authReducer
});
const store=configureStore({reducer:rootReducer},applyMiddleware(ReduxThunk))
export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
