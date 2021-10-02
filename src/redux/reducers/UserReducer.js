import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  RESET_PASSWORD_USER_REQUEST,
  RESET_PASSWORD_USER_SUCCESS,
  RESET_PASSWORD_USER_ERROR,
  OPEN_EDIT_USER_MODAL,
  OPEN_RESET_PASSWORD_MODAL,
  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_ERROR,
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_ERROR,
  RESET_PASSWORD_ME_REQUEST,
  RESET_PASSWORD_ME_SUCCESS,
  RESET_PASSWORD_ME_ERROR,
} from "../actions/types";

const INITIAL_STATE = {
  users: [],
  getUsersRequesting: false,
  getUsersError: "",
  userRoles: [],
  pagecount: 1,
  activePage: 1,

  createRequesting: false,
  createError: "",

  editUser: {},
  editRequesting: false,
  editError: "",

  changeStatusRequesting: false,
  changeStatusError: "",

  deleteRequesting: false,
  deleteError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        getUsersRequesting: true,
        getUsersError: "",
        refreshPage: false,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        getUsersRequesting: false,
        getUsersError: "",
        users: action.payload.Result,
        pagecount: !!action.payload.PageCount ? action.payload.PageCount : 1,
        activePage: action.payload.PageActive,
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        getUsersRequesting: false,
        getUsersError: action.payload,
      };

    // Create
    case CREATE_USER_REQUEST:
      return { ...state, createRequesting: true, createError: "" };
    case CREATE_USER_SUCCESS:
      return { ...state, createRequesting: false, refreshPage: true };
    case CREATE_USER_ERROR:
      return {
        ...state,
        createError: "Create User error.",
        createRequesting: false,
      };

    // Edit
    case EDIT_USER_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_USER_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_USER_ERROR:
      return { ...state, editError: "Edit User error.", editRequesting: false };

    // Delete
    case DELETE_USER_REQUEST:
      return { ...state, deleteRequesting: true, deleteError: "" };
    case DELETE_USER_SUCCESS:
      return { ...state, deleteRequesting: false, refreshPage: true };
    case DELETE_USER_ERROR:
      return {
        ...state,
        deleteError: "Delete User error.",
        deleteRequesting: false,
      };

    // Reset Password
    case RESET_PASSWORD_USER_REQUEST:
      return { ...state, resetPasswordUserRequesting: true, deleteError: "" };
    case RESET_PASSWORD_USER_SUCCESS:
      return { ...state, resetPasswordUserRequesting: false };
    case RESET_PASSWORD_USER_ERROR:
      return {
        ...state,
        deleteError: "Reset Password User error.",
        resetPasswordUserRequesting: false,
      };

    // Reset Password Me
    case RESET_PASSWORD_ME_REQUEST:
      return { ...state, resetPasswordMeRequesting: true, deleteError: "" };
    case RESET_PASSWORD_ME_SUCCESS:
      return { ...state, resetPasswordMeRequesting: false, refreshPage: true };
    case RESET_PASSWORD_ME_ERROR:
      return {
        ...state,
        deleteError: "Reset Password User error.",
        resetPasswordMeRequesting: false,
      };

    // Change Status
    case CHANGE_STATUS_REQUEST:
      return { ...state, changeStatusRequesting: true, editError: "" };
    case CHANGE_STATUS_SUCCESS:
      return { ...state, changeStatusRequesting: false, refreshPage: true };
    case CHANGE_STATUS_ERROR:
      return {
        ...state,
        changeStatusError: "Change Status error.",
        changeStatusRequesting: false,
      };

    // TYPE
    case GET_ROLES_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        userRoles: action.payload.Result,
      };
    case GET_ROLES_ERROR:
      return {
        ...state,
        fetchError: "Get UserRoles error.",
        fetchRequesting: false,
      };

    case OPEN_EDIT_USER_MODAL:
      return { ...state, editUser: action.payload };
    case OPEN_RESET_PASSWORD_MODAL:
      return { ...state, editUser: action.payload };
    default:
      return state;
  }
};
