import {
  GET_OFFICEOFQUALIFICATION_REQUEST,
  GET_OFFICEOFQUALIFICATION_SUCCESS,
  GET_OFFICEOFQUALIFICATION_ERROR,
  EDIT_OFFICEOFQUALIFICATION_REQUEST,
  EDIT_OFFICEOFQUALIFICATION_SUCCESS,
  EDIT_OFFICEOFQUALIFICATION_ERROR,
} from "../actions/types";
const INITIAL_STATE = {
  officeOfQualification: [],

  fetchRequesting: false,
  fetchError: "",

  createRequesting: false,
  createError: "",

  editRequesting: false,
  editError: "",

  deleteRequesting: false,
  deleteError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Request
    case GET_OFFICEOFQUALIFICATION_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_OFFICEOFQUALIFICATION_SUCCESS:
      return {
        ...state,
        officeOfQualification: action.payload.Result,
        fetchRequesting: false,
      };
    case GET_OFFICEOFQUALIFICATION_ERROR:
      return {
        ...state,
        fetchError: "Get officeOfQualification error.",
        fetchRequesting: false,
      };

    // Edit
    case EDIT_OFFICEOFQUALIFICATION_REQUEST:
      return { ...state, editRequesting: true, editError: "" };
    case EDIT_OFFICEOFQUALIFICATION_SUCCESS:
      return { ...state, editRequesting: false, refreshPage: true };
    case EDIT_OFFICEOFQUALIFICATION_ERROR:
      return {
        ...state,
        editError: "Edit officeOfQualification error.",
        editRequesting: false,
      };
    default:
      return state;
  }
};
