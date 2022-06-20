export const ADD_USER = "ADD_USER";
export const SET_USERS = "SET_USERS";
import { defaultApiUrl } from "../../config/config";

export const fetchUsers = () => {
  return async (dispatch,getState) => {
    try {
      const userId=getState().auth.userId;
      const response = await fetch(`${defaultApiUrl}users.json`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      
      const resData = await response.json();
      const loadedUsers = [];
      for (let key in resData)
      {
        loadedUsers.push({
          key,
          name:resData[key].name,
          email:resData[key].email,
          address:resData[key].address,
          age:resData[key].age,
          bloodGroup:resData[key].bloodGroup,
          userId:resData[key].userId,
          userType:resData[key].userType,
          phone:resData[key].phone,
        })
      }
      const loggedUser=loadedUsers.find(user => user.userId === userId);
      dispatch({type: SET_USERS, users:loadedUsers, loggedUser});
    } catch (error) {
      throw error;
    }
  };
};

export const addUser = (userData) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const newUser = {
      ...userData,
      userId,
    };
    const response = await fetch(`${defaultApiUrl}users.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newUser,
      }),
    });
    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }
    const resData = await response.json();
    newUser.key=resData.name;
    dispatch({
      type: ADD_USER,
      newUser,
    });
  };
};
