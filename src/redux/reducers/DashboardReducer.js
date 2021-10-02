import {
  GET_DASHBOARD_REQUEST,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_ERROR,
} from "../actions/types";

const INITIAL_STATE = {
  dashboard: [{
    "type": "view",
    "detail": {
      "numberOfView": {
        "totalView": 0,
        "dateView": {
          "date": [],
          "view": []
        }
      }
    }
  },
  {
    "type": "download",
    "detail": {
      "numberOfDownload": {
        "totalDownload": 0,
        "dateDownload": {
          "date": [],
          "download": []
        }
      }
    }
  }],

  fetchRequesting: false,
  fetchError: "",

  refreshPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Dashboard
    case GET_DASHBOARD_REQUEST:
      return {
        ...state,
        fetchRequesting: true,
        fetchError: "",
        refreshPage: false,
      };
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: action.payload.Result,
      };
    case GET_DASHBOARD_ERROR:
      return {
        ...state,
        fetchError: "Get Dashboard error.",
        fetchRequesting: false,
      };

    default:
      return state;
  }
};
