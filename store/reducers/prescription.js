import {
  ADD_PRESCRIPTION,
  FETCH_PRESCRIPTION,
  UPDATE_PRESCRIPTION,
} from "../actions/prescription";

const initialState = {
  prescriptions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRESCRIPTION:
      return {
        ...state,
        prescriptions: state.prescriptions.concat({ ...action.data }),
      };
    case FETCH_PRESCRIPTION:
      return {
        ...state,
        prescriptions: action.prescriptionList,
      };
    case UPDATE_PRESCRIPTION:
      return {
        ...state,
        prescriptions: state.prescriptions.map((item) =>
          item.key === action.key ? { ...item, ...action.updatedData } : item
        ),
      };
    default:
      return state;
  }
};
