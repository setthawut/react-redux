import {
  GET_CONFIGURATION_REQUEST,
  GET_CONFIGURATION_SUCCESS,
  GET_CONFIGURATION_ERROR,
  EDIT_CONFIGURATION_REQUEST,
  EDIT_CONFIGURATION_SUCCESS,
  EDIT_CONFIGURATION_ERROR,
  HIDE_LOADING,
} from "./types";
import axios from "axios";
import { API_URL } from "../../constants";
import LOADING from "./loading_key";

export function getConfiguration() {
  return (dispatch) => {
    dispatch({ type: GET_CONFIGURATION_REQUEST });

    axios
      .get(`${API_URL}/setting/configuration`)
      .then((response) => {
        dispatch({
          type: GET_CONFIGURATION_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getConfiguration,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_CONFIGURATION_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getConfiguration,
        });
      });
  };
}
export function editConfiguration(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_CONFIGURATION_REQUEST });

    axios
      .put(`${API_URL}/setting/configuration`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editConfiguration,
        });
        dispatch({
          type: EDIT_CONFIGURATION_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("บันทึกการตั้งค่าเกี่ยวกับเรา - องค์ประกอบ	 สำเร็จ");
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editConfiguration,
        });
        dispatch({
          type: EDIT_CONFIGURATION_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}
