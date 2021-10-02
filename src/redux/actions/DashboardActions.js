import {
  GET_DASHBOARD_REQUEST,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_ERROR,
  HIDE_LOADING,
} from "./types";

import axios from "axios";
import { API_URL } from "../../constants";
import LOADING from "./loading_key";

export function getDashboard(value) {
  return (dispatch) => {
    dispatch({ type: GET_DASHBOARD_REQUEST });
    let params = {
      ...value,
    };
    axios
      .get(`${API_URL}/dashboard`, {
        params: {
          ...params,
        },
      })

      .then((response) => {
        dispatch({
          type: GET_DASHBOARD_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getDashboard,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_DASHBOARD_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getDashboard,
        });
      });
  };
}
