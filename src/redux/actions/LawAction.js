import {
  GET_LAW_REQUEST,
  GET_LAW_SUCCESS,
  GET_LAW_ERROR,
  CREATE_LAW_REQUEST,
  CREATE_LAW_SUCCESS,
  CREATE_LAW_ERROR,
  EDIT_LAW_REQUEST,
  EDIT_LAW_SUCCESS,
  EDIT_LAW_ERROR,
  DELETE_LAW_REQUEST,
  DELETE_LAW_SUCCESS,
  DELETE_LAW_ERROR,
  GET_LAW_TYPE_REQUEST,
  GET_LAW_TYPE_SUCCESS,
  GET_LAW_TYPE_ERROR,
  HIDE_LOADING,
  HIDE_MODAL,
} from "./types";
import axios from "axios";
import { API_URL, PAGE_LIMIT } from "../../constants";
import LOADING from "./loading_key";

export function getLaw(value) {
  return (dispatch) => {
    dispatch({ type: GET_LAW_REQUEST });

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
          type: GET_LAW_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getLaw,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_LAW_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getLaw,
        });
      });
  };
}

export function createLaw(value) {
  return (dispatch) => {
    dispatch({ type: CREATE_LAW_REQUEST });

    axios
      .post(`${API_URL}/paper`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createLaw,
        });
        dispatch({
          type: CREATE_LAW_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("สร้าง กฎหมายที่เกี่ยวข้อง สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createLaw,
        });
        dispatch({
          type: CREATE_LAW_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function editLaw(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_LAW_REQUEST });

    axios
      .put(`${API_URL}/paper`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editLaw,
        });
        dispatch({
          type: EDIT_LAW_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("แก้ไข้ กฎหมายที่เกี่ยวข้อง สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editLaw,
        });
        dispatch({
          type: EDIT_LAW_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function deleteLaw(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_LAW_REQUEST });

    axios
      .delete(`${API_URL}/paper/${id}`)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteLaw,
        });
        dispatch({
          type: DELETE_LAW_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("ลบ กฎหมายที่เกี่ยวข้อง สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteLaw,
        });
        dispatch({
          type: DELETE_LAW_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function getLawType() {
  return (dispatch) => {
    dispatch({ type: GET_LAW_TYPE_REQUEST });

    axios
      .get(`${API_URL}/paper/type`)
      .then((response) => {
        dispatch({
          type: GET_LAW_TYPE_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getNotifyType,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_LAW_TYPE_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getNotifyType,
        });
      });
  };
}
