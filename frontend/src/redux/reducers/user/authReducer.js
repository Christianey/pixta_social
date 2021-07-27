import actionTypes from "../../actionTypes";

const initialState = {};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTH:
      return payload;
    default:
      return state;
  }
};

export default authReducer;
