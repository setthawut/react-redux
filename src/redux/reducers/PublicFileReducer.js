import {
  GET_PUBLICFILE_REQUEST,
  GET_PUBLICFILE_SUCCESS,
  GET_PUBLICFILE_ERROR,
  EDIT_PUBLICFILE_REQUEST,
  EDIT_PUBLICFILE_SUCCESS,
  EDIT_PUBLICFILE_ERROR,
} from "../actions/types";
const INITIAL_STATE = {
  publicFile: [],

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
    case GET_PUBLICFILE_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_PUBLICFILE_SUCCESS:
      return {
        ...state,
        publicFile:action.payload.Result,
        
        fetchRequesting: false,
      };
    case GET_PUBLICFILE_ERROR:
      return {
        ...state,
        fetchError: "Get publicFile error.",
        fetchRequesting: false,
      };

    // Edit
    case EDIT_PUBLICFILE_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_PUBLICFILE_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_PUBLICFILE_ERROR:
      return {
        ...state,
        editError: "Edit publicFile error.",
        editRequesting: false,
      };
    default:
      return state;
  }
};
