import { SET_USERS, ADD_USER } from "../actions/users";
const initialState={
    loggedInUser:null,
    users:[],
}
export default (state=initialState,action)=>{
    switch (action.type) {
        case SET_USERS:
                return {
                    ...state,
                    users: action.users,
                    loggedInUser:action.loggedUser,
                };
        case ADD_USER:
                return {
                    ...state,
                    users: state.users.concat(action.newUser),
                    loggedInUser:action.newUser,
                }
        default:
                return state
    }
}