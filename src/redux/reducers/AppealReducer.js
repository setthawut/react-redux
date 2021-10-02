import {
  GET_APPEAL_REQUEST,
  GET_APPEAL_SUCCESS,
  GET_APPEAL_ERROR,
  CREATE_APPEAL_REQUEST,
  CREATE_APPEAL_SUCCESS,
  CREATE_APPEAL_ERROR,
  EDIT_APPEAL_REQUEST,
  EDIT_APPEAL_SUCCESS,
  EDIT_APPEAL_ERROR,
  DELETE_APPEAL_REQUEST,
  DELETE_APPEAL_SUCCESS,
  DELETE_APPEAL_ERROR,
  GET_APPEAL_TYPE_REQUEST,
  GET_APPEAL_TYPE_SUCCESS,
  GET_APPEAL_TYPE_ERROR,
  OPEN_EDIT_APPEAL_MODAL,
} from "../actions/types";

const INITIAL_STATE = {
  appeal: [],
  appealType: [],

  fetchRequesting: false,
  fetchError: "",
  pagecount: 1,
  activePage: 1,

  createRequesting: false,
  createError: "",

  editAppeal: {},
  editRequesting: false,
  editError: "",

  deleteRequesting: false,
  deleteError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Request
    case GET_APPEAL_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_APPEAL_SUCCESS:
      return {
        ...state,
        appeal: action.payload.Result,
        pagecount: !!action.payload.PageCount ? action.payload.PageCount : 1,
        activePage: action.payload.activePage,
      };
    case GET_APPEAL_ERROR:
      return {
        ...state,
        fetchError: "Get Appeal error.",
        fetchRequesting: false,
      };

    // Create
    case CREATE_APPEAL_REQUEST:
      return { ...state, createRequesting: true, createError: "" };
    case CREATE_APPEAL_SUCCESS:
      return { ...state, createRequesting: false, refreshPage: true };
    case CREATE_APPEAL_ERROR:
      return {
        ...state,
        createError: "Create Appeal error.",
        createRequesting: false,
      };

    // Edit
    case EDIT_APPEAL_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_APPEAL_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_APPEAL_ERROR:
      return {
        ...state,
        editError: "Edit Appeal error.",
        editRequesting: false,
      };

    // Delete
    case DELETE_APPEAL_REQUEST:
      return { ...state, deleteRequesting: true, deleteError: "" };
    case DELETE_APPEAL_SUCCESS:
      return { ...state, deleteRequesting: false, refreshPage: true };
    case DELETE_APPEAL_ERROR:
      return {
        ...state,
        deleteError: "Delete Appeal error.",
        deleteRequesting: false,
      };
    // TYPE
    case GET_APPEAL_TYPE_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_APPEAL_TYPE_SUCCESS:
      return {
        ...state,
        appealType: action.payload.Result,
      };
    case GET_APPEAL_TYPE_ERROR:
      return {
        ...state,
        fetchError: "Get Appeal error.",
        fetchRequesting: false,
      };

    case OPEN_EDIT_APPEAL_MODAL:
      return { ...state, editAppeal: action.payload };

    default:
      return state;
  }
};
