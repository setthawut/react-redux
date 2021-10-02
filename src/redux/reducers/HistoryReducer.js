import {
  GET_HISTORY_REQUEST,
  GET_HISTORY_SUCCESS,
  GET_HISTORY_ERROR,
  CREATE_HISTORY_REQUEST,
  CREATE_HISTORY_SUCCESS,
  CREATE_HISTORY_ERROR,
  EDIT_HISTORY_REQUEST,
  EDIT_HISTORY_SUCCESS,
  EDIT_HISTORY_ERROR,
  DELETE_HISTORY_REQUEST,
  DELETE_HISTORY_SUCCESS,
  DELETE_HISTORY_ERROR,
  OPEN_EDIT_HISTORY_MODAL,
} from "../actions/types";

const INITIAL_STATE = {
  history: [],

  fetchRequesting: false,
  fetchError: "",
  pagecount: 1,
  activePage: 1,

  createRequesting: false,
  createError: "",

  editHistory: {},
  editRequesting: false,
  editError: "",

  deleteRequesting: false,
  deleteError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Request
    case GET_HISTORY_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_HISTORY_SUCCESS:
      return {
        ...state,
        history: action.payload.Result,
        pagecount: !!action.payload.PageCount ? action.payload.PageCount : 1,
        activePage: action.payload.PageActive,
      };
    case GET_HISTORY_ERROR:
      return {
        ...state,
        fetchError: "Get History error.",
        fetchRequesting: false,
      };

    // Create
    case CREATE_HISTORY_REQUEST:
      return { ...state, createRequesting: true, createError: "" };
    case CREATE_HISTORY_SUCCESS:
      return { ...state, createRequesting: false, refreshPage: true };
    case CREATE_HISTORY_ERROR:
      return {
        ...state,
        createError: "Create History error.",
        createRequesting: false,
      };

    // Edit
    case EDIT_HISTORY_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_HISTORY_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_HISTORY_ERROR:
      return {
        ...state,
        editError: "Edit History error.",
        editRequesting: false,
      };

    // Delete
    case DELETE_HISTORY_REQUEST:
      return { ...state, deleteRequesting: true, deleteError: "" };
    case DELETE_HISTORY_SUCCESS:
      return { ...state, deleteRequesting: false, refreshPage: true };
    case DELETE_HISTORY_ERROR:
      return {
        ...state,
        deleteError: "Delete Meeting error.",
        deleteRequesting: false,
      };

    case OPEN_EDIT_HISTORY_MODAL:
      return { ...state, editHistory: action.payload };

    default:
      return state;
  }
};
