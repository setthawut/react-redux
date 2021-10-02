import {
  GET_APPEAL_REQUEST,
  GET_APPEAL_SUCCESS,
  GET_APPEAL_ERROR,
  CREATE_APPEAL_REQUEST,
  CREATE_APPEAL_SUCCESS,
  CREATE_APPEAL_ERROR,
  EDIT_APPEAL_REQUEST,
  EDIT_APPEAL_SUCCESS,
  EDIT_APPEAL_ERROR,
  DELETE_APPEAL_REQUEST,
  DELETE_APPEAL_SUCCESS,
  DELETE_APPEAL_ERROR,
  GET_APPEAL_TYPE_REQUEST,
  GET_APPEAL_TYPE_SUCCESS,
  GET_APPEAL_TYPE_ERROR,
  HIDE_LOADING,
  HIDE_MODAL,
} from "./types";
import axios from "axios";
import { API_URL, PAGE_LIMIT } from "../../constants";
import LOADING from "./loading_key";

export function getAppeal(value) {
  return (dispatch) => {
    dispatch({ type: GET_APPEAL_REQUEST });

    let params = {
      ...value.filter,
      page: !!value.pageKey ? value.pageKey : 1,
      limit: PAGE_LIMIT,
      type: !!value.typeKey // type จากการ fectครั้งแรกอยู่ใน componentdidmount
        ? value.typeKey
        : !!value.filterType // type จากการ กด ค้นหา filter
        ? value.filterType
        : value.selectPageType, // type จากการ กด เลข Pagination
    };
    axios
      .get(`${API_URL}/papers`, {
        params: {
          ...params,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_APPEAL_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getAppeal,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_APPEAL_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getAppeal,
        });
      });
  };
}

export function createAppeal(value) {
  return (dispatch) => {
    dispatch({ type: CREATE_APPEAL_REQUEST });

    axios
      .post(`${API_URL}/paper`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createAppeal,
        });
        dispatch({
          type: CREATE_APPEAL_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("สร้าง เรื่องร้องเรียน กก.วล. สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createAppeal,
        });
        dispatch({
          type: CREATE_APPEAL_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function editAppeal(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_APPEAL_REQUEST });

    axios
      .put(`${API_URL}/paper`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editAppeal,
        });
        dispatch({
          type: EDIT_APPEAL_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("แก้ไข เรื่องร้องเรียน กก.วล. สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editAppeal,
        });
        dispatch({
          type: EDIT_APPEAL_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function deleteAppeal(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_APPEAL_REQUEST });

    axios
      .delete(`${API_URL}/paper/${id}`)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteAppeal,
        });
        dispatch({
          type: DELETE_APPEAL_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("ลบ เรื่องร้องเรียน กก.วล. สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteAppeal,
        });
        dispatch({
          type: DELETE_APPEAL_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function getAppealType() {
  return (dispatch) => {
    dispatch({ type: GET_APPEAL_TYPE_REQUEST });

    axios
      .get(`${API_URL}/paper/type`)
      .then((response) => {
        dispatch({
          type: GET_APPEAL_TYPE_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getAppealType,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_APPEAL_TYPE_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getAppealType,
        });
      });
  };
}
