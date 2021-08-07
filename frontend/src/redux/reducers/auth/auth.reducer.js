import authActionTypes from "./auth.actionTypes";
import initialState from "./auth.initialState";

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case authActionTypes.AUTH_LOAD_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case authActionTypes.AUTH_LOAD_SUCCESS:
      return {
        ...state,
        accessToken: payload.accessToken,
        user: payload.user,
        isLoading: false,
        error: null,
      };

    case authActionTypes.AUTH_LOAD_ERROR:
      return {
        ...state,
        accessToken: null,
        user: null,
        isLoading: false,
        error: payload,
      };
    case authActionTypes.AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
