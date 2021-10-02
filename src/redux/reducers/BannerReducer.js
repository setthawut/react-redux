import {
  GET_BANNER_REQUEST,
  GET_BANNER_SUCCESS,
  GET_BANNER_ERROR,
  CREATE_BANNER_REQUEST,
  CREATE_BANNER_SUCCESS,
  CREATE_BANNER_ERROR,
  EDIT_BANNER_REQUEST,
  EDIT_BANNER_SUCCESS,
  EDIT_BANNER_ERROR,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_ERROR,
  OPEN_EDIT_BANNER_MODAL,
  CHANGE_STATUS_BANNER_REQUEST,
  CHANGE_STATUS_BANNER_SUCCESS,
  CHANGE_STATUS_BANNER_ERROR,
} from "../actions/types";

const INITIAL_STATE = {
  banners: [],

  fetchRequesting: false,
  fetchError: "",

  createRequesting: false,
  createError: "",

  editBanner: {},
  editRequesting: false,
  editError: "",

  deleteRequesting: false,
  deleteError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Request
    case GET_BANNER_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_BANNER_SUCCESS:
      return {
        ...state,
        banners: action.payload.Result,
        fetchRequesting: false,
      };
    case GET_BANNER_ERROR:
      return {
        ...state,
        fetchError: "Get Law error.",
        fetchRequesting: false,
      };

    // Create
    case CREATE_BANNER_REQUEST:
      return { ...state, createRequesting: true, createError: "" };
    case CREATE_BANNER_SUCCESS:
      return { ...state, createRequesting: false, refreshPage: true };
    case CREATE_BANNER_ERROR:
      return {
        ...state,
        createError: "Create Banner error.",
        createRequesting: false,
      };

    // Edit
    case EDIT_BANNER_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_BANNER_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_BANNER_ERROR:
      return {
        ...state,
        editError: "Edit Banner error.",
        editRequesting: false,
      };

    // Delete
    case DELETE_BANNER_REQUEST:
      return { ...state, deleteRequesting: true, deleteError: "" };
    case DELETE_BANNER_SUCCESS:
      return { ...state, deleteRequesting: false, refreshPage: true };
    case DELETE_BANNER_ERROR:
      return {
        ...state,
        deleteError: "Delete Banner error.",
        deleteRequesting: false,
      };

    // Change Status
    case CHANGE_STATUS_BANNER_REQUEST:
      return { ...state, changeStatusRequesting: true, editError: "" };
    case CHANGE_STATUS_BANNER_SUCCESS:
      return { ...state, changeStatusRequesting: false, refreshPage: true };
    case CHANGE_STATUS_BANNER_ERROR:
      return {
        ...state,
        changeStatusError: "Change Status error.",
        changeStatusRequesting: false,
      };

    case OPEN_EDIT_BANNER_MODAL:
      return { ...state, editBanner: action.payload };

    default:
      return state;
  }
};
