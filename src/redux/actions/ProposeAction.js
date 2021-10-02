import {
  GET_PROPOSE_REQUEST,
  GET_PROPOSE_SUCCESS,
  GET_PROPOSE_ERROR,
  EDIT_PROPOSE_REQUEST,
  EDIT_PROPOSE_SUCCESS,
  EDIT_PROPOSE_ERROR,
  HIDE_LOADING,
} from "./types";
import axios from "axios";
import { API_URL } from "../../constants";
import LOADING from "./loading_key";

export function getPropose() {
  return (dispatch) => {
    dispatch({ type: GET_PROPOSE_REQUEST });

    axios
      .get(`${API_URL}/setting/presentation`)
      .then((response) => {
        dispatch({
          type: GET_PROPOSE_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getPropose,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_PROPOSE_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getPropose,
        });
      });
  };
}
export function editPropose(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_PROPOSE_REQUEST });

    axios
      .put(`${API_URL}/setting/presentation`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editPropose,
        });
        dispatch({
          type: EDIT_PROPOSE_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("บันทึกการตั้งค่าการเสนอเรื่อง กก.วล. สำเร็จ");
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editPropose,
        });
        dispatch({
          type: EDIT_PROPOSE_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}
