import authActionTypes from "./auth.actionTypes";

const authLoadStart = () => ({
  type: authActionTypes.AUTH_LOAD_START,
});

const authLoadSuccess = (response) => ({
  type: authActionTypes.AUTH_LOAD_SUCCESS,
  payload: response,
});

const authLoadError = (error) => ({
  type: authActionTypes.AUTH_LOAD_ERROR,
  payload: error,
});

const authClearError = () => ({
  type: authActionTypes.AUTH_CLEAR_ERROR,
});

const authActions = {
  authLoadStart,
  authLoadSuccess,
  authLoadError,
  authClearError,
};

export default authActions;
