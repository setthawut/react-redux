import {
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
  GET_NEWS_ERROR,
  CREATE_NEWS_REQUEST,
  CREATE_NEWS_SUCCESS,
  CREATE_NEWS_ERROR,
  EDIT_NEWS_REQUEST,
  EDIT_NEWS_SUCCESS,
  EDIT_NEWS_ERROR,
  DELETE_NEWS_REQUEST,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_ERROR,
  OPEN_EDIT_NEWS_MODAL,
} from "../actions/types";

const INITIAL_STATE = {
  news: [],

  fetchRequesting: false,
  fetchError: "",
  pagecount: 1,
  activePage: 1,

  createRequesting: false,
  createError: "",

  editNews: {},
  editRequesting: false,
  editError: "",

  deleteRequesting: false,
  deleteError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Request
    case GET_NEWS_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        news: action.payload.Result,
        pagecount: !!action.payload.PageCount ? action.payload.PageCount : 1,
        activePage: action.payload.PageActive,
      };
    case GET_NEWS_ERROR:
      return {
        ...state,
        fetchError: "Get News error.",
        fetchRequesting: false,
      };

    // Create
    case CREATE_NEWS_REQUEST:
      return { ...state, createRequesting: true, createError: "" };
    case CREATE_NEWS_SUCCESS:
      return { ...state, createRequesting: false, refreshPage: true };
    case CREATE_NEWS_ERROR:
      return {
        ...state,
        createError: "Create News error.",
        createRequesting: false,
      };

    // Edit
    case EDIT_NEWS_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_NEWS_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_NEWS_ERROR:
      return {
        ...state,
        editError: "Edit News error.",
        editRequesting: false,
      };

    // Delete
    case DELETE_NEWS_REQUEST:
      return { ...state, deleteRequesting: true, deleteError: "" };
    case DELETE_NEWS_SUCCESS:
      return { ...state, deleteRequesting: false, refreshPage: true };
    case DELETE_NEWS_ERROR:
      return {
        ...state,
        deleteError: "Delete News error.",
        deleteRequesting: false,
      };

    case OPEN_EDIT_NEWS_MODAL:
      return { ...state, editNews: action.payload };

    default:
      return state;
  }
};
