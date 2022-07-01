import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { View, ActivityIndicator, Text } from "react-native";
import * as userActions from "../store/actions/users";
import UserNavigator from "./UserNavigator";
const NavigatorLoader = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
          setTimeout(()=>{
            try {   
              dispatch(userActions.fetchUsers());
         } catch (error) {
             console.log(error.message);                
         }
         setIsLoading(false);
          },2000);
    },[dispatch]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="lightblue" />
      </View>
    );
  }
  return <Fragment><UserNavigator /></Fragment>;
};
export default NavigatorLoader;
