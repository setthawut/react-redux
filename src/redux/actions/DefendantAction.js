import {
  GET_DEFENDANT_REQUEST,
  GET_DEFENDANT_SUCCESS,
  GET_DEFENDANT_ERROR,
  CREATE_DEFENDANT_REQUEST,
  CREATE_DEFENDANT_SUCCESS,
  CREATE_DEFENDANT_ERROR,
  EDIT_DEFENDANT_REQUEST,
  EDIT_DEFENDANT_SUCCESS,
  EDIT_DEFENDANT_ERROR,
  DELETE_DEFENDANT_REQUEST,
  DELETE_DEFENDANT_SUCCESS,
  DELETE_DEFENDANT_ERROR,
  HIDE_LOADING,
  HIDE_MODAL,
} from "./types";
import axios from "axios";
import { API_URL, PAGE_LIMIT } from "../../constants";
import LOADING from "./loading_key";

export function getDefendant(value) {
  return (dispatch) => {
    dispatch({ type: GET_DEFENDANT_REQUEST });

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
          type: GET_DEFENDANT_SUCCESS,
          payload: response.data.Result,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getDefendant,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_DEFENDANT_ERROR,
          payload: error,
        });
        dispatch({
          type: GET_DEFENDANT_ERROR,
          payload: LOADING.getDefendant,
        });
      });
  };
}

export function createDefendant(value) {
  return (dispatch) => {
    dispatch({ type: CREATE_DEFENDANT_REQUEST });

    axios
      .post(`${API_URL}/paper`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createDefendant,
        });
        dispatch({
          type: CREATE_DEFENDANT_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("สร้าง ผู้ทรงคุณวุฒิ สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createDefendant,
        });
        dispatch({
          type: CREATE_DEFENDANT_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function editDefendant(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_DEFENDANT_REQUEST });

    axios
      .put(`${API_URL}/paper`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editDefendant,
        });
        dispatch({
          type: EDIT_DEFENDANT_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("แก้ไข ผู้ทรงคุณวุฒิ สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editDefendant,
        });
        dispatch({
          type: EDIT_DEFENDANT_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function deleteDefendant(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_DEFENDANT_REQUEST });

    axios
      .delete(`${API_URL}/paper/${id}`)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteDefendant,
        });
        dispatch({
          type: DELETE_DEFENDANT_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("ลบ ผู้ทรงคุณวุฒิ  สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteDefendant,
        });
        dispatch({
          type: DELETE_DEFENDANT_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}
