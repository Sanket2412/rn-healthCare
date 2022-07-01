import { defaultApiUrl } from "../../config/config";

export const FETCH_APPOINTMENT = "FETCH_APPOINTMENT";
export const BOOK_APPOINTMENT = "BOOK_APPOINTMENT";
export const CANCEl_APPOINTMENT = "CANCEl_APPOINTMENT";

export const cancelAppointment = (key) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(
        `${defaultApiUrl}appointments/${key}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            enabled: false,
          }),
        }
      );
      const resData = await response.json();
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      dispatch({ type: CANCEl_APPOINTMENT, key });
    } catch (error) {
      throw error;
    }
  };
};
export const bookAppointment = (bookingData) => {
  return async (dispatch, getState) => {
    try {
      const user = getState().user.loggedInUser;
      const token = getState().auth.token;
      const response = await fetch(
        `${defaultApiUrl}appointments.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...bookingData,
            userId: user.key,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const resData = await response.json();

      dispatch({
        type: BOOK_APPOINTMENT,
        data: { ...bookingData, userId: user.key, key: resData.name},
      });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchAppointments = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${defaultApiUrl}appointments.json`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const loadedData = [];
      for (key in resData) {
        loadedData.push({
          key,
          ...resData[key],
        });
      }
      dispatch({ type: FETCH_APPOINTMENT, appointmentList: loadedData });
    } catch (error) {
      throw error;
    }
  };
};
