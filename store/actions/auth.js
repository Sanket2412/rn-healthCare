import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "../../config/config";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};
export const login = (email, password) => {
    return async (dispatch) => {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = errorId.replace(/_/gi," ");
        throw new Error(message);
      }
      const resData = await response.json();
      dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
  };

export const signup=(email,password)=>{
    return async(dispatch)=>{
        const response= await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,{ method:"POST", headers:{"Content-Type":"application/json",}, body: JSON.stringify({
            email:email,
            password:password,
            returnSecureToken:true,
        }),
    }
    );
    if(!response.ok)
    {
        const errorResData= await response.json();
        const errorId=errorResData.error.message;
        let message=errorId.replace(/_/gi," ");
        throw new Error(message);
    }
    const resData= await response.json();
    dispatch(authenticate(resData.localId, resData.idToken,parseInt(resData.expiresIn)*1000));
    const expirationDate=new Date( new Date().getTime()+ parseInt(resData.expiresIn) *1000
    );
    saveDataToStorage(resData.idToken,resData.localId,expirationDate);
    };
};

export const logout=()=>{
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return{type: LOGOUT };
}
const clearLogoutTimer=()=>{
    if(timer)
    {
        clearTimeout(timer);
    }
}
const setLogoutTimer=(expirationTime)=>{
    return (dispath)=>{
        timer=setTimeout(()=>{
            dispath(logout());
        },expirationTime);
    };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ token, userId, expiryDate: expirationDate.toISOString() })
  );
};
