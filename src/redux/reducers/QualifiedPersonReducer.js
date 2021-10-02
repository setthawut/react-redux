import {
  GET_QUALIFIEDPERSON_REQUEST,
  GET_QUALIFIEDPERSON_SUCCESS,
  GET_QUALIFIEDPERSON_ERROR,
  CREATE_QUALIFIEDPERSON_REQUEST,
  CREATE_QUALIFIEDPERSON_SUCCESS,
  CREATE_QUALIFIEDPERSON_ERROR,
  EDIT_QUALIFIEDPERSON_REQUEST,
  EDIT_QUALIFIEDPERSON_SUCCESS,
  EDIT_QUALIFIEDPERSON_ERROR,
  DELETE_QUALIFIEDPERSON_REQUEST,
  DELETE_QUALIFIEDPERSON_SUCCESS,
  DELETE_QUALIFIEDPERSON_ERROR,
  OPEN_EDIT_QUALIFIEDPERSON_MODAL,
} from "../actions/types";

const INITIAL_STATE = {
  qualifiedPerson: [],

  fetchRequesting: false,
  fetchError: "",
  pagecount: 1,
  activePage: 1,

  createRequesting: false,
  createError: "",

  editQualifiedPerson: {},
  editRequesting: false,
  editError: "",

  deleteRequesting: false,
  deleteError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Request
    case GET_QUALIFIEDPERSON_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_QUALIFIEDPERSON_SUCCESS:
      return {
        ...state,
      
        qualifiedPerson: action.payload,
        pagecount: !!action.payload.PageCount ? action.payload.PageCount : 1,
        activePage: action.payload.activePage,
      };
    case GET_QUALIFIEDPERSON_ERROR:
      return {
        ...state,
        fetchError: "Get Appeal error.",
        fetchRequesting: false,
      };

    // Create
    case CREATE_QUALIFIEDPERSON_REQUEST:
      return { ...state, createRequesting: true, createError: "" };
    case CREATE_QUALIFIEDPERSON_SUCCESS:
      return { ...state, createRequesting: false, refreshPage: true };
    case CREATE_QUALIFIEDPERSON_ERROR:
      return {
        ...state,
        createError: "Create Appeal error.",
        createRequesting: false,
      };

    // Edit
    case EDIT_QUALIFIEDPERSON_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_QUALIFIEDPERSON_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_QUALIFIEDPERSON_ERROR:
      return {
        ...state,
        editError: "Edit qualifiedPerson error.",
        editRequesting: false,
      };

    // Delete
    case DELETE_QUALIFIEDPERSON_REQUEST:
      return { ...state, deleteRequesting: true, deleteError: "" };
    case DELETE_QUALIFIEDPERSON_SUCCESS:
      return { ...state, deleteRequesting: false, refreshPage: true };
    case DELETE_QUALIFIEDPERSON_ERROR:
      return {
        ...state,
        deleteError: "Delete qualifiedPerson error.",
        deleteRequesting: false,
      };

    case OPEN_EDIT_QUALIFIEDPERSON_MODAL:
      return { ...state, editQualifiedPerson: action.payload };

    default:
      return state;
  }
};
