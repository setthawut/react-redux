import {
  GET_CONFIGURATION_REQUEST,
  GET_CONFIGURATION_SUCCESS,
  GET_CONFIGURATION_ERROR,
  EDIT_CONFIGURATION_REQUEST,
  EDIT_CONFIGURATION_SUCCESS,
  EDIT_CONFIGURATION_ERROR,
} from "../actions/types";
const INITIAL_STATE = {
  configuration: [],

  fetchRequesting: false,
  fetchError: "",

  createRequesting: false,
  createError: "",

  editAboutUs: {},
  editRequesting: false,
  editError: "",

  deleteRequesting: false,
  deleteError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Request
    case GET_CONFIGURATION_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_CONFIGURATION_SUCCESS:
      return {
        ...state,
        configuration: action.payload.Result.detail
          ? action.payload.Result.detail
          : [],
        fetchRequesting: false,
      };
    case GET_CONFIGURATION_ERROR:
      return {
        ...state,
        fetchError: "Get configuration error.",
        fetchRequesting: false,
      };

    // Edit
    case EDIT_CONFIGURATION_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_CONFIGURATION_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_CONFIGURATION_ERROR:
      return {
        ...state,
        editError: "Edit configuration error.",
        editRequesting: false,
      };
    default:
      return state;
  }
};
