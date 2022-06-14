export const ADD_USER="ADD_USER";
export const SET_USERS="SET_USERS";
import { defaultApiUrl} from "../../config/config"
export const addUser=(userData)=>{
    console.log("userData "+userData);
    return async(dispatch,getState)=>{
        const token=getState().auth.token;
        const userId=getState().auth.userId;
        const response= await fetch(`${defaultApiUrl}users.json?auth=${token}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                ...userData,
                userId,
            }),
        }
        );
        if(!response.ok)
        {
            throw new Error("Something Went Wrong!");
        }
        const resData=await response.json();
        /*dispatch({
            type: ADD_USER,
            userId,
            userData,
        })*/
    }
}