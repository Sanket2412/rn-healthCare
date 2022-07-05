export const ADD_USER = "ADD_USER";
export const LOGOUT="LOGOUT";
export const SET_USERS = "SET_USERS";
export const UPDATE_USER="UPDATE_USER";
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
          ...resData[key],
        })
      }
      const loggedUser=loadedUsers.find(user => user.userId === userId);
      dispatch({type: SET_USERS, users:loadedUsers, loggedUser});
    } catch (error) {
      throw error;
    }
  };
};

export const handlerRemoveFamilyMember=(removingData)=>{
  return async(dispatch,getState)=>{
    const token=getState().auth.token;
    const response= await fetch(`${defaultApiUrl}users/${removingData.key}.json?auth=${token}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        familyMembers:removingData.familyMembers
      })
    });
  }
}

export const handlerAddFamilyMember=(loggedEmail,familyArray)=>{
  return async (dispatch, getState)=>{
    const token = getState().auth.token;
    familyArray.forEach(async (element) => {
       await fetch(`${defaultApiUrl}users/${element.key}.json?auth=${token}`,{
        method:"PATCH",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          familyMembers: element.familyMembers.concat(loggedEmail)
        })
      });
    });
  }
}

export const updateUser=(id,updatedData)=>{
  return async (dispatch, getState)=>{
    const token = getState().auth.token;
    const response= await fetch(`${defaultApiUrl}users/${id}.json?auth=${token}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...updatedData
      })
    });
    if(!response.ok)
    {
      throw Error("Something Went Wrong Try Again Later :)")
    }
    dispatch({type: UPDATE_USER,id,updatedData})
  }
}
export const clearLoggedInUser=()=>{
  return{ type: LOGOUT}
}

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
