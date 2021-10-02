import {
  GET_LAW_REQUEST,
  GET_LAW_SUCCESS,
  GET_LAW_ERROR,
  CREATE_LAW_REQUEST,
  CREATE_LAW_SUCCESS,
  CREATE_LAW_ERROR,
  EDIT_LAW_REQUEST,
  EDIT_LAW_SUCCESS,
  EDIT_LAW_ERROR,
  DELETE_LAW_REQUEST,
  DELETE_LAW_SUCCESS,
  DELETE_LAW_ERROR,
  GET_LAW_TYPE_REQUEST,
  GET_LAW_TYPE_SUCCESS,
  GET_LAW_TYPE_ERROR,
  OPEN_EDIT_LAW_MODAL,
} from "../actions/types";

const INITIAL_STATE = {
  law: [],
  lawType: [],

  fetchRequesting: false,
  fetchError: "",
  pagecount: 1,
  activePage: 1,

  createRequesting: false,
  createError: "",

  editLaw: {},
  editRequesting: false,
  editError: "",

  deleteRequesting: false,
  deleteError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Request
    case GET_LAW_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_LAW_SUCCESS:
      return {
        ...state,
        law: action.payload.Result,
        pagecount: !!action.payload.PageCount ? action.payload.PageCount : 1,
        activePage: action.payload.PageActive,
      };
    case GET_LAW_ERROR:
      return {
        ...state,
        fetchError: "Get Law error.",
        fetchRequesting: false,
      };

    // Create
    case CREATE_LAW_REQUEST:
      return { ...state, createRequesting: true, createError: "" };
    case CREATE_LAW_SUCCESS:
      return { ...state, createRequesting: false, refreshPage: true };
    case CREATE_LAW_ERROR:
      return {
        ...state,
        createError: "Create Law error.",
        createRequesting: false,
      };

    // Edit
    case EDIT_LAW_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_LAW_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_LAW_ERROR:
      return {
        ...state,
        editError: "Edit Law error.",
        editRequesting: false,
      };

    // Delete
    case DELETE_LAW_REQUEST:
      return { ...state, deleteRequesting: true, deleteError: "" };
    case DELETE_LAW_SUCCESS:
      return { ...state, deleteRequesting: false, refreshPage: true };
    case DELETE_LAW_ERROR:
      return {
        ...state,
        deleteError: "Delete Law error.",
        deleteRequesting: false,
      };

    // TYPE
    case GET_LAW_TYPE_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_LAW_TYPE_SUCCESS:
      return {
        ...state,
        lawType: action.payload.Result,
      };
    case GET_LAW_TYPE_ERROR:
      return {
        ...state,
        fetchError: "Get Law error.",
        fetchRequesting: false,
      };

    case OPEN_EDIT_LAW_MODAL:
      return { ...state, editLaw: action.payload };

    default:
      return state;
  }
};
