import {
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_ERROR,
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_ERROR,
  EDIT_ADDRESS_REQUEST,
  EDIT_ADDRESS_SUCCESS,
  EDIT_ADDRESS_ERROR,
} from "../actions/types";
const INITIAL_STATE = {
  address: [],

  fetchRequesting: false,
  fetchError: "",

  createRequesting: false,
  createError: "",

  editAddress: {},
  editRequesting: false,
  editError: "",

  deleteRequesting: false,
  deleteError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Request
    case GET_ADDRESS_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_ADDRESS_SUCCESS:
      return { ...state, address: action.payload.Result };
    case GET_ADDRESS_ERROR:
      return {
        ...state,
        fetchError: "Get Address error.",
        fetchRequesting: false,
      };

    // Create
    case CREATE_ADDRESS_REQUEST:
      return { ...state, createRequesting: true, createError: "" };
    case CREATE_ADDRESS_SUCCESS:
      return { ...state, createRequesting: false, refreshPage: true };
    case CREATE_ADDRESS_ERROR:
      return {
        ...state,
        createError: "Create Address error.",
        createRequesting: false,
      };

    // Edit
    case EDIT_ADDRESS_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_ADDRESS_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_ADDRESS_ERROR:
      return {
        ...state,
        editError: "Edit Address error.",
        editRequesting: false,
      };
    default:
      return state;
  }
};
