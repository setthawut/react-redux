import {
  GET_PROPOSE_REQUEST,
  GET_PROPOSE_SUCCESS,
  GET_PROPOSE_ERROR,
  EDIT_PROPOSE_REQUEST,
  EDIT_PROPOSE_SUCCESS,
  EDIT_PROPOSE_ERROR,
} from "../actions/types";
const INITIAL_STATE = {
  propose: [],

  fetchRequesting: false,
  fetchError: "",

  createRequesting: false,
  createError: "",

  editProposeData: {},
  editRequesting: false,
  editError: "",

  deleteRequesting: false,
  deleteError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Request
    case GET_PROPOSE_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_PROPOSE_SUCCESS:
      return {
        ...state,
        propose:
          action.payload.Result.length > 0
            ? action.payload.Result[0].detail
            : [],
        fetchRequesting: false,
      };
    case GET_PROPOSE_ERROR:
      return {
        ...state,
        fetchError: "Get propose error.",
        fetchRequesting: false,
      };

    // Edit
    case EDIT_PROPOSE_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_PROPOSE_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_PROPOSE_ERROR:
      return {
        ...state,
        editError: "Edit propose error.",
        editRequesting: false,
      };
    default:
      return state;
  }
};
