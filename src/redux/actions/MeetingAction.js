import {
  GET_MEETING_REQUEST,
  GET_MEETING_SUCCESS,
  GET_MEETING_ERROR,
  CREATE_MEETING_REQUEST,
  CREATE_MEETING_SUCCESS,
  CREATE_MEETING_ERROR,
  EDIT_MEETING_REQUEST,
  EDIT_MEETING_SUCCESS,
  EDIT_MEETING_ERROR,
  DELETE_MEETING_REQUEST,
  DELETE_MEETING_SUCCESS,
  DELETE_MEETING_ERROR,
  HIDE_LOADING,
  HIDE_MODAL,
  GET_MEETING_TYPE_REQUEST,
  GET_MEETING_TYPE_SUCCESS,
  GET_MEETING_TYPE_ERROR,
} from "./types";

import axios from "axios";
import { API_URL, PAGE_LIMIT } from "../../constants";
import LOADING from "./loading_key";

export function getMeeting(value) {
  return (dispatch) => {
    dispatch({ type: GET_MEETING_REQUEST });
  
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
          type: GET_MEETING_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getMeeting,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_MEETING_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getMeeting,
        });
      });
  };
}

export function createMeeting(value) {
  return (dispatch) => {
    dispatch({ type: CREATE_MEETING_REQUEST });

    axios
      .post(`${API_URL}/paper`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createMeeting,
        });
        dispatch({
          type: CREATE_MEETING_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("สร้างประชุม กก.วล.สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createMeeting,
        });
        dispatch({
          type: CREATE_MEETING_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function editMeeting(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_MEETING_REQUEST });

    axios
      .put(`${API_URL}/paper`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editMeeting,
        });
        dispatch({
          type: EDIT_MEETING_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("แก้ไขประชุม กก.วล.สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editMeeting,
        });
        dispatch({
          type: EDIT_MEETING_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function deleteMeeting(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_MEETING_REQUEST });

    axios
      .delete(`${API_URL}/paper/${id}`)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteMeeting,
        });
        dispatch({
          type: DELETE_MEETING_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("ลบประชุม กก.วล.สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteMeeting,
        });
        dispatch({
          type: DELETE_MEETING_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function getMeetingType() {
  return (dispatch) => {
    dispatch({ type: GET_MEETING_TYPE_REQUEST });

    axios
      .get(`${API_URL}/paper/type`)
      .then((response) => {
        dispatch({
          type: GET_MEETING_TYPE_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getMeetingType,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_MEETING_TYPE_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getMeetingType,
        });
      });
  };
}
