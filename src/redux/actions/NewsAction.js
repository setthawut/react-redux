import {
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
  GET_NEWS_ERROR,
  CREATE_NEWS_REQUEST,
  CREATE_NEWS_SUCCESS,
  CREATE_NEWS_ERROR,
  EDIT_NEWS_REQUEST,
  EDIT_NEWS_SUCCESS,
  EDIT_NEWS_ERROR,
  DELETE_NEWS_REQUEST,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_ERROR,
  HIDE_LOADING,
  HIDE_MODAL,
} from "./types";

import axios from "axios";
import { API_URL, PAGE_LIMIT } from "../../constants";
import LOADING from "./loading_key";

export function getNews(value) {
  return (dispatch) => {
    dispatch({ type: GET_NEWS_REQUEST });

    let params = {
      ...value,
      page: !!value.pageKey ? value.pageKey : 1,
      limit: PAGE_LIMIT,
    };
    axios
      .get(`${API_URL}/pressreleases`, {
        params: {
          ...params,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_NEWS_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getNews,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_NEWS_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getNews,
        });
      });
  };
}

export function createNews(value) {
  // const config = { headers: { "Content-Type": "multipart/form-data" } };
  const config = { headers: { "Access-Control-Allow-Origin": "*" } };
  return (dispatch) => {
    dispatch({ type: CREATE_NEWS_REQUEST });

    axios
      .post(`${API_URL}/pressrelease`, value, )
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createNews,
        });
        dispatch({
          type: CREATE_NEWS_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("สร้าง ข่าวประชาสัมพันธ์ สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createNews,
        });
        dispatch({
          type: CREATE_NEWS_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function editNews(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_NEWS_REQUEST });
    console.log(">>>",value)
    axios
      .put(`${API_URL}/pressrelease`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editNews,
        });
        dispatch({
          type: EDIT_NEWS_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("แก้ไข ข่าวประชาสัมพันธ์ สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editNews,
        });
        dispatch({
          type: EDIT_NEWS_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function deleteNews(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_NEWS_REQUEST });

    axios
      .delete(`${API_URL}/pressrelease/${id}`)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteNews,
        });
        dispatch({
          type: DELETE_NEWS_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("ลบ ข่าวประชาสัมพันธ์ สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteNews,
        });
        dispatch({
          type: DELETE_NEWS_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}
