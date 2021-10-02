import {
  GET_NOTIFY_REQUEST,
  GET_NOTIFY_SUCCESS,
  GET_NOTIFY_ERROR,
  CREATE_NOTIFY_REQUEST,
  CREATE_NOTIFY_SUCCESS,
  CREATE_NOTIFY_ERROR,
  EDIT_NOTIFY_REQUEST,
  EDIT_NOTIFY_SUCCESS,
  EDIT_NOTIFY_ERROR,
  DELETE_NOTIFY_REQUEST,
  DELETE_NOTIFY_SUCCESS,
  DELETE_NOTIFY_ERROR,
  GET_NOTIFY_TYPE_REQUEST,
  GET_NOTIFY_TYPE_SUCCESS,
  GET_NOTIFY_TYPE_ERROR,
  GET_NOTIFY_DOCUMEN_REFERENCES_REQUEST,
  GET_DOCUMEN_REFERENCES_SUCCESS,
  GET_DOCUMEN_REFERENCES_ERROR,
  HIDE_LOADING,
  HIDE_MODAL,
} from "./types";
import axios from "axios";
import { API_URL, PAGE_LIMIT } from "../../constants";
import LOADING from "./loading_key";

export function getNotify(value) {
  return (dispatch) => {
    dispatch({ type: GET_NOTIFY_REQUEST });

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
          type: GET_NOTIFY_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getNotify,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_NOTIFY_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getNotify,
        });
      });
  };
}

export function createNotify(value) {
  return (dispatch) => {
    dispatch({ type: CREATE_NOTIFY_REQUEST });

    axios
      .post(`${API_URL}/paper`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createNotify,
        });
        dispatch({
          type: CREATE_NOTIFY_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("สร้าง ประกาศ / คำสั่ง สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createNotify,
        });
        dispatch({
          type: CREATE_NOTIFY_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function editNotify(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_NOTIFY_REQUEST });

    axios
      .put(`${API_URL}/paper`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editNotify,
        });
        dispatch({
          type: EDIT_NOTIFY_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("แก้ไข ประกาศ / คำสั่ง สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editNotify,
        });
        dispatch({
          type: EDIT_NOTIFY_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function deleteNotify(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_NOTIFY_REQUEST });

    axios
      .delete(`${API_URL}/paper/${id}`)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteNotify,
        });
        dispatch({
          type: DELETE_NOTIFY_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("ลบ ประกาศ / คำสั่ง สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteNotify,
        });
        dispatch({
          type: DELETE_NOTIFY_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function getNotifyType() {
  return (dispatch) => {
    dispatch({ type: GET_NOTIFY_TYPE_REQUEST });

    axios
      .get(`${API_URL}/paper/type`)
      .then((response) => {
        dispatch({
          type: GET_NOTIFY_TYPE_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getNotifyType,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_NOTIFY_TYPE_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getNotifyType,
        });
      });
  };
}

export function getNotifyDocumentReferences(value) {
  return (dispatch) => {
    dispatch({ type: GET_NOTIFY_DOCUMEN_REFERENCES_REQUEST });

    let params = { type: value };

    axios
      .get(`${API_URL}/paper/documentreferences`, {
        params: {
          ...params,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_DOCUMEN_REFERENCES_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getDocumentReferences,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_DOCUMEN_REFERENCES_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getDocumentReferences,
        });
      });
  };
}
