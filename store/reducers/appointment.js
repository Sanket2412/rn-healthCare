import { BOOK_APPOINTMENT,CANCEl_APPOINTMENT,FETCH_APPOINTMENT } from "../actions/appointment";

const initialState={
    appointments:[],
}

export default (state=initialState,action)=>{
    switch (action.type) {
        case BOOK_APPOINTMENT:return{
            ...state,
            appointments: state.appointments.concat({...action.data}),
        }
        case FETCH_APPOINTMENT:return{
            ...state,
            appointments:action.appointmentList
        }
        case CANCEl_APPOINTMENT: return{
            ...state,
            appointments: state.appointments.map(item => item.key===action.key ? {...item,enabled:false} : item)
        }
        default:
            return state;
    }

}