import {
  GET_QUALIFIEDPERSON_REQUEST,
  GET_QUALIFIEDPERSON_SUCCESS,
  GET_QUALIFIEDPERSON_ERROR,
  CREATE_QUALIFIEDPERSON_REQUEST,
  CREATE_QUALIFIEDPERSON_SUCCESS,
  CREATE_QUALIFIEDPERSON_ERROR,
  EDIT_QUALIFIEDPERSON_REQUEST,
  EDIT_QUALIFIEDPERSON_SUCCESS,
  EDIT_QUALIFIEDPERSON_ERROR,
  DELETE_QUALIFIEDPERSON_REQUEST,
  DELETE_QUALIFIEDPERSON_SUCCESS,
  DELETE_QUALIFIEDPERSON_ERROR,
  HIDE_LOADING,
  HIDE_MODAL,
} from "./types";
import axios from "axios";
import { API_URL, PAGE_LIMIT } from "../../constants";
import LOADING from "./loading_key";

export function getQualifiedPerson(value) {
  return (dispatch) => {
    dispatch({ type: GET_QUALIFIEDPERSON_REQUEST });

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
          type: GET_QUALIFIEDPERSON_SUCCESS,
          payload: response.data.Result,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getQualifiedPerson,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_QUALIFIEDPERSON_ERROR,
          payload: error,
        });
        dispatch({
          type: GET_QUALIFIEDPERSON_ERROR,
          payload: LOADING.getQualifiedPerson,
        });
      });
  };
}

export function createQualifiedPerson(value) {
  return (dispatch) => {
    dispatch({ type: CREATE_QUALIFIEDPERSON_REQUEST });

    axios
      .post(`${API_URL}/paper`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createQualifiedPerson,
        });
        dispatch({
          type: CREATE_QUALIFIEDPERSON_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("สร้าง ผู้ทรงคุณวุฒิ สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createQualifiedPerson,
        });
        dispatch({
          type: CREATE_QUALIFIEDPERSON_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function editQualifiedPerson(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_QUALIFIEDPERSON_REQUEST });

    axios
      .put(`${API_URL}/paper`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editQualifiedPerson,
        });
        dispatch({
          type: EDIT_QUALIFIEDPERSON_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("แก้ไข ผู้ทรงคุณวุฒิ สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editQualifiedPerson,
        });
        dispatch({
          type: EDIT_QUALIFIEDPERSON_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function deleteQualifiedPerson(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_QUALIFIEDPERSON_REQUEST });

    axios
      .delete(`${API_URL}/paper/${id}`)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteQualifiedPerson,
        });
        dispatch({
          type: DELETE_QUALIFIEDPERSON_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("ลบ ผู้ทรงคุณวุฒิ  สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteQualifiedPerson,
        });
        dispatch({
          type: DELETE_QUALIFIEDPERSON_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}
