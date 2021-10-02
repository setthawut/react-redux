import {
  GET_HISTORY_REQUEST,
  GET_HISTORY_SUCCESS,
  GET_HISTORY_ERROR,
  HIDE_LOADING,
} from "./types";

import axios from "axios";
import { API_URL } from "../../constants";
import LOADING from "./loading_key";

export function getHistory(value) {
  return (dispatch) => {
    dispatch({ type: GET_HISTORY_REQUEST });

    let params = {
      ...value,
      page: !!value.pageKey ? value.pageKey : 1,
      limit: 50,
    };

    axios
      .get(`${API_URL}/activitylogs`, {
        params: {
          ...params,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_HISTORY_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getHistory,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_HISTORY_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getHistory,
        });
      });
  };
}
