import { defaultApiUrl } from "../../config/config";

export const FETCH_PRESCRIPTION="FETCH_PRESCRIPTION";
export const ADD_PRESCRIPTION="ADD_PRESCRIPTION";
export const UPDATE_PRESCRIPTION="UPDATE_PRESCRIPTION";


export const addPrescription=(prescriptionData)=>{
    return async(dispatch,getState) =>{
        try {
            const token=getState().auth.token;
            const response= await fetch(`${defaultApiUrl}prescription.json?auth=${token}`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    ...prescriptionData
                }),
            })
            const resData= await response.json();
            if(!response.ok)
            {
                throw new Error("Something Went Wrong!")
            }
            dispatch({type: ADD_PRESCRIPTION, data:{...prescriptionData, id: resData.name}});
        } catch (error) {
          throw error  
        }
    }
}