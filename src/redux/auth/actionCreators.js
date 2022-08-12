import actions from "./actions";

export const updateLoggedStatus = (payload) => {
    return (dispatch) => {
      dispatch({
        type: actions.SET_LOGGED_STATUS,
        payload: payload,
      });
    };
  };

  export const setUserDetails = (payload) => {
    return (dispatch) => {
      dispatch({
        type: actions.SET_USER_DETAILS,
        payload: payload,
      });
    };
};

export const setCenters = (payload) => {
  return (dispatch) => {
    dispatch({
      type: actions.SET_CENTERS,
      payload: payload,
    });
  };
};

export const setFoodDetail = (name, count) => {
  return (dispatch) => {
    dispatch({
      type: name === "Breakfast" ? actions.SET_BREAK_DETAILS :  actions.SET_EVENING_DETAILS,
      payload: count,
    });
  };
};