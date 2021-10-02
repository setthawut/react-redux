import {
  GET_DEFENDANT_REQUEST,
  GET_DEFENDANT_SUCCESS,
  GET_DEFENDANT_ERROR,
  CREATE_DEFENDANT_REQUEST,
  CREATE_DEFENDANT_SUCCESS,
  CREATE_DEFENDANT_ERROR,
  EDIT_DEFENDANT_REQUEST,
  EDIT_DEFENDANT_SUCCESS,
  EDIT_DEFENDANT_ERROR,
  DELETE_DEFENDANT_REQUEST,
  DELETE_DEFENDANT_SUCCESS,
  DELETE_DEFENDANT_ERROR,
  OPEN_EDIT_DEFENDANT_MODAL,
} from "../actions/types";

const INITIAL_STATE = {
  defendant: [],

  fetchRequesting: false,
  fetchError: "",
  pagecount: 1,
  activePage: 1,

  createRequesting: false,
  createError: "",

  editDefendant: {},
  editRequesting: false,
  editError: "",

  deleteRequesting: false,
  deleteError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Request
    case GET_DEFENDANT_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_DEFENDANT_SUCCESS:
      return {
        ...state,

        defendant: action.payload,
        pagecount: !!action.payload.PageCount ? action.payload.PageCount : 1,
        activePage: action.payload.activePage,
      };
    case GET_DEFENDANT_ERROR:
      return {
        ...state,
        fetchError: "Get Defendant error.",
        fetchRequesting: false,
      };

    // Create
    case CREATE_DEFENDANT_REQUEST:
      return { ...state, createRequesting: true, createError: "" };
    case CREATE_DEFENDANT_SUCCESS:
      return { ...state, createRequesting: false, refreshPage: true };
    case CREATE_DEFENDANT_ERROR:
      return {
        ...state,
        createError: "Create Appeal error.",
        createRequesting: false,
      };

    // Edit
    case EDIT_DEFENDANT_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_DEFENDANT_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_DEFENDANT_ERROR:
      return {
        ...state,
        editError: "Edit defendant error.",
        editRequesting: false,
      };

    // Delete
    case DELETE_DEFENDANT_REQUEST:
      return { ...state, deleteRequesting: true, deleteError: "" };
    case DELETE_DEFENDANT_SUCCESS:
      return { ...state, deleteRequesting: false, refreshPage: true };
    case DELETE_DEFENDANT_ERROR:
      return {
        ...state,
        deleteError: "Delete defendant error.",
        deleteRequesting: false,
      };

    case OPEN_EDIT_DEFENDANT_MODAL:
      return { ...state, editDefendant: action.payload };

    default:
      return state;
  }
};
