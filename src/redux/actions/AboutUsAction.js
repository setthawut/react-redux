import {
  GET_ABOUTUS_REQUEST,
  GET_ABOUTUS_SUCCESS,
  GET_ABOUTUS_ERROR,
  EDIT_ABOUTUS_REQUEST,
  EDIT_ABOUTUS_SUCCESS,
  EDIT_ABOUTUS_ERROR,
  HIDE_LOADING,
} from "./types";
import axios from "axios";
import { API_URL } from "../../constants";
import LOADING from "./loading_key";

export function getAboutUs() {
  return (dispatch) => {
    dispatch({ type: GET_ABOUTUS_REQUEST });

    axios
      .get(`${API_URL}/setting/aboutus`)
      .then((response) => {
        dispatch({
          type: GET_ABOUTUS_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getAboutUs,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ABOUTUS_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getAboutUs,
        });
      });
  };
}
export function editAboutUs(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_ABOUTUS_REQUEST });

    axios
      .put(`${API_URL}/setting/aboutus`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editAboutUs,
        });
        dispatch({
          type: EDIT_ABOUTUS_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert(
          "บันทึกการตั้งค่าเกี่ยวกับเรา - ประวัติความเป็นมา สำเร็จ",
        );
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editAboutUs,
        });
        dispatch({
          type: EDIT_ABOUTUS_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}
