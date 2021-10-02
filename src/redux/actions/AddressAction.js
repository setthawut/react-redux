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
  HIDE_LOADING,
  HIDE_MODAL,
} from "./types";
import axios from "axios";
import { API_URL } from "../../constants";
import LOADING from "./loading_key";

export function getAddress() {
  return (dispatch) => {
    dispatch({ type: GET_ADDRESS_REQUEST });

    axios
      .get(`${API_URL}/setting/address`)
      .then((response) => {
        dispatch({
          type: GET_ADDRESS_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getAddress,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ADDRESS_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getAddress,
        });
      });
  };
}



export function editAddress(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_ADDRESS_REQUEST });

    axios
      .put(`${API_URL}/setting/address`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editAddress,
        });
        dispatch({
          type: EDIT_ADDRESS_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("บันทึก การตั้งค่าที่อยู่ สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editAddress,
        });
        dispatch({
          type: EDIT_ADDRESS_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}
