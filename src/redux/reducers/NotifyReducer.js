import {
  GET_NOTIFY_REQUEST,
  GET_NOTIFY_SUCCESS,
  GET_NOTIFY_ERROR,
  CREATE_NOTIFY_REQUEST,
  CREATE_NOTIFY_SUCCESS,
  CREATE_NOTIFY_ERROR,
  EDIT_NOTIFY_REQUEST,
  EDIT_NOTIFY_SUCCESS,
  EDIT_NOTIFY_ERROR,
  DELETE_NOTIFY_REQUEST,
  DELETE_NOTIFY_SUCCESS,
  DELETE_NOTIFY_ERROR,
  GET_NOTIFY_TYPE_REQUEST,
  GET_NOTIFY_TYPE_SUCCESS,
  GET_NOTIFY_TYPE_ERROR,
  GET_NOTIFY_DOCUMEN_REFERENCES_REQUEST,
  GET_DOCUMEN_REFERENCES_SUCCESS,
  GET_DOCUMEN_REFERENCES_ERROR,
  OPEN_EDIT_NOTIFY_MODAL,
} from "../actions/types";

const INITIAL_STATE = {
  notify: [],
  notifyType: [],
  notifyDocumentReferences: [],

  fetchRequesting: false,
  fetchError: "",
  pagecount: 1,
  activePage: 1,

  createRequesting: false,
  createError: "",

  editNotify: {},
  editRequesting: false,
  editError: "",

  deleteRequesting: false,
  deleteError: "",

  refreshPage: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Request
    case GET_NOTIFY_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_NOTIFY_SUCCESS:
      return {
        ...state,
        notify: action.payload.Result,
        pagecount: !!action.payload.PageCount ? action.payload.PageCount : 1,
        activePage: action.payload.PageActive,
      };
    case GET_NOTIFY_ERROR:
      return {
        ...state,
        fetchError: "Get Notify error.",
        fetchRequesting: false,
      };

    // Create
    case CREATE_NOTIFY_REQUEST:
      return { ...state, createRequesting: true, createError: "" };
    case CREATE_NOTIFY_SUCCESS:
      return { ...state, createRequesting: false, refreshPage: true };
    case CREATE_NOTIFY_ERROR:
      return {
        ...state,
        createError: "Create Notify error.",
        createRequesting: false,
      };

    // Edit
    case EDIT_NOTIFY_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_NOTIFY_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_NOTIFY_ERROR:
      return {
        ...state,
        editError: "Edit Notify error.",
        editRequesting: false,
      };

    // Delete
    case DELETE_NOTIFY_REQUEST:
      return { ...state, deleteRequesting: true, deleteError: "" };
    case DELETE_NOTIFY_SUCCESS:
      return { ...state, deleteRequesting: false, refreshPage: true };
    case DELETE_NOTIFY_ERROR:
      return {
        ...state,
        deleteError: "Delete Notify error.",
        deleteRequesting: false,
      };
    // TYPE
    case GET_NOTIFY_TYPE_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_NOTIFY_TYPE_SUCCESS:
      return {
        ...state,
        notifyType: action.payload.Result,
      };
    case GET_NOTIFY_TYPE_ERROR:
      return {
        ...state,
        fetchError: "Get Notify error.",
        fetchRequesting: false,
      };
    // DOCUMEN_REFERENCES
    case GET_NOTIFY_DOCUMEN_REFERENCES_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_DOCUMEN_REFERENCES_SUCCESS:
      return {
        ...state,
        notifyDocumentReferences: action.payload.Result,
      };
    case GET_DOCUMEN_REFERENCES_ERROR:
      return {
        ...state,
        fetchError: "Get Notify error.",
        fetchRequesting: false,
      };

    case OPEN_EDIT_NOTIFY_MODAL:
      return { ...state, editNotify: action.payload };

    default:
      return state;
  }
};
