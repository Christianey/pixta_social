import authActions from "./auth.actions";
import { postData } from "../../../utils/fetchDataAPI";

const signUp = (data) => async (dispatch) => {
  dispatch(authActions.authLoadStart());
  try {
    const response = await postData("register", data);
    dispatch(authActions.authLoadSuccess(response.data));
    localStorage.setItem("firstLogin", true);
  } catch (error) {
    dispatch(authActions.authLoadError(error.response.data.message));
  }
};

const signIn = (data) => async (dispatch) => {
  dispatch(authActions.authLoadStart());
  try {
    const response = await postData("login", data);
    dispatch(authActions.authLoadSuccess(response.data));
    localStorage.setItem("firstLogin", true);
  } catch (error) {
    dispatch(authActions.authLoadError(error.response.data.message));
  }
};

const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch(authActions.authLoadStart());
    try {
      const response = await postData("refresh_token");
      dispatch(authActions.authLoadSuccess(response.data));
    } catch (error) {
      dispatch(authActions.authLoadError(error.response.data.message));
    }
  }
};

const authThunk = {
  signIn,
  signUp,
  refreshToken,
};

export default authThunk;
