import {
  GET_MEETING_REQUEST,
  GET_MEETING_SUCCESS,
  GET_MEETING_ERROR,
  CREATE_MEETING_REQUEST,
  CREATE_MEETING_SUCCESS,
  CREATE_MEETING_ERROR,
  EDIT_MEETING_REQUEST,
  EDIT_MEETING_SUCCESS,
  EDIT_MEETING_ERROR,
  DELETE_MEETING_REQUEST,
  DELETE_MEETING_SUCCESS,
  DELETE_MEETING_ERROR,
  GET_MEETING_TYPE_REQUEST,
  GET_MEETING_TYPE_SUCCESS,
  GET_MEETING_TYPE_ERROR,
  OPEN_EDIT_MEETING_MODAL,
} from "../actions/types";

const INITIAL_STATE = {
  meeting: [],
  meetingType: [],

  fetchRequesting: false,
  fetchError: "",
  pagecount: 1,
  activePage: 1,

  createRequesting: false,
  createError: "",

  editMeeting: {},
  editRequesting: false,
  editError: "",

  deleteRequesting: false,
  deleteError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Request
    case GET_MEETING_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_MEETING_SUCCESS:
      return {
        ...state,
        meeting: action.payload.Result,

        pagecount: !!action.payload.PageCount ? action.payload.PageCount : 1,
        activePage: action.payload.PageActive,
      };
    case GET_MEETING_ERROR:
      return {
        ...state,
        fetchError: "Get Meeting error.",
        fetchRequesting: false,
      };

    // Create
    case CREATE_MEETING_REQUEST:
      return { ...state, createRequesting: true, createError: "" };
    case CREATE_MEETING_SUCCESS:
      return { ...state, createRequesting: false, refreshPage: true };
    case CREATE_MEETING_ERROR:
      return {
        ...state,
        createError: "Create Meeting error.",
        createRequesting: false,
      };

    // Edit
    case EDIT_MEETING_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_MEETING_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_MEETING_ERROR:
      return {
        ...state,
        editError: "Edit Meeting error.",
        editRequesting: false,
      };

    // Delete
    case DELETE_MEETING_REQUEST:
      return { ...state, deleteRequesting: true, deleteError: "" };
    case DELETE_MEETING_SUCCESS:
      return { ...state, deleteRequesting: false, refreshPage: true };
    case DELETE_MEETING_ERROR:
      return {
        ...state,
        deleteError: "Delete Meeting error.",
        deleteRequesting: false,
      };

    // TYPE
    case GET_MEETING_TYPE_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_MEETING_TYPE_SUCCESS:
      return {
        ...state,
        meetingType: action.payload.Result,
      };
    case GET_MEETING_TYPE_ERROR:
      return {
        ...state,
        fetchError: "Get Meeting error.",
        fetchRequesting: false,
      };

    case OPEN_EDIT_MEETING_MODAL:
      return { ...state, editMeeting: action.payload };

    default:
      return state;
  }
};
