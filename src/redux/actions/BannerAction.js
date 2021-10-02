import {
  GET_BANNER_REQUEST,
  GET_BANNER_SUCCESS,
  GET_BANNER_ERROR,
  CREATE_BANNER_REQUEST,
  CREATE_BANNER_SUCCESS,
  CREATE_BANNER_ERROR,
  EDIT_BANNER_REQUEST,
  EDIT_BANNER_SUCCESS,
  EDIT_BANNER_ERROR,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_ERROR,
  CHANGE_STATUS_BANNER_REQUEST,
  CHANGE_STATUS_BANNER_SUCCESS,
  CHANGE_STATUS_BANNER_ERROR,
  HIDE_LOADING,
  HIDE_MODAL,
} from "./types";
import axios from "axios";
import { API_URL } from "../../constants";
import LOADING from "./loading_key";

export function getBanner() {
  return (dispatch) => {
    dispatch({ type: GET_BANNER_REQUEST });

    axios
      .get(`${API_URL}/setting/banner`)
      .then((response) => {
        dispatch({
          type: GET_BANNER_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getBanner,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_BANNER_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getBanner,
        });
      });
  };
}

export function createBanner(value) {
  return (dispatch) => {
    dispatch({ type: CREATE_BANNER_REQUEST });

    axios
      .post(`${API_URL}/setting/banner`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createBanner,
        });
        dispatch({
          type: CREATE_BANNER_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("สร้าง แบนเนอร์ สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createBanner,
        });
        dispatch({
          type: CREATE_BANNER_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function editBanner(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_BANNER_REQUEST });

    axios
      .put(`${API_URL}/setting/banner`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editBanner,
        });
        dispatch({
          type: EDIT_BANNER_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("แก้ไข แบนเนอร์ สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editBanner,
        });
        dispatch({
          type: EDIT_BANNER_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function deleteBanner(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_BANNER_REQUEST });

    axios
      .delete(`${API_URL}/setting/banner/${id}`)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteBanner,
        });
        dispatch({
          type: DELETE_BANNER_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("ลบการตั้งค่า แบบเนอร์ สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteBanner,
        });
        dispatch({
          type: DELETE_BANNER_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function changeStatusBanner(value) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS_BANNER_REQUEST });

    axios
      .put(`${API_URL}/setting/banner`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.changeStatusBanner,
        });
        dispatch({
          type: CHANGE_STATUS_BANNER_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("บันทึกการใช้งานสำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.changeStatusBanner,
        });
        dispatch({
          type: CHANGE_STATUS_BANNER_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}
