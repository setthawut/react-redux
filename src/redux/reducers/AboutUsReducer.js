import {
  GET_ABOUTUS_REQUEST,
  GET_ABOUTUS_SUCCESS,
  GET_ABOUTUS_ERROR,
  EDIT_ABOUTUS_REQUEST,
  EDIT_ABOUTUS_SUCCESS,
  EDIT_ABOUTUS_ERROR,
} from "../actions/types";
const INITIAL_STATE = {
  aboutUs: [],

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
    case GET_ABOUTUS_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_ABOUTUS_SUCCESS:
      return {
        ...state,
        aboutUs: action.payload.Result,
        fetchRequesting: false,
      };
    case GET_ABOUTUS_ERROR:
      return {
        ...state,
        fetchError: "Get aboutUs error.",
        fetchRequesting: false,
      };

    // Edit
    case EDIT_ABOUTUS_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_ABOUTUS_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_ABOUTUS_ERROR:
      return {
        ...state,
        editError: "Edit aboutUs error.",
        editRequesting: false,
      };
    default:
      return state;
  }
};
