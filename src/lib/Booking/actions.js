import types from "./types";

export const incrementStage = () => ({ type: types.INCREMENT_STAGE });
export const decrementStage = () => ({ type: types.DECREMENT_STAGE });
export const setTourBooking = (data) => ({ type: types.SET_TOUR_BOOKING, payload: data });
export const togglePlace = (place) => ({ type: types.TOGGLE_PLACE , payload: place});
export const clear = () => ({ type: types.CLEAR });
