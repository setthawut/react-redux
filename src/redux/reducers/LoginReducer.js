import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from "../actions/types";

const INITIAL_STATE = {
  user: null,
  error: "",

  loginRequesting: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { ...state, loginRequesting: true, error: "" };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_ERROR:
      return { ...state, error: action.payload, loginRequesting: false };
    case LOGOUT_USER:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
