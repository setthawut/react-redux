import {
  CHANGE_PASSWORD_ME_REQUEST,
  CHANGE_PASSWORD_ME_SUCCESS,
  CHANGE_PASSWORD_ME_ERROR,
} from "../actions/types";

const INITIAL_STATE = {
  editRequesting: false,
  editError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_ME_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case CHANGE_PASSWORD_ME_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case CHANGE_PASSWORD_ME_ERROR:
      return {
        ...state,
        editError: "Change Password error.",
        editRequesting: false,
      };

    default:
      return state;
  }
};
