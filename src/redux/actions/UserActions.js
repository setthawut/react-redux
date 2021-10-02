import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  RESET_PASSWORD_USER_REQUEST,
  RESET_PASSWORD_USER_SUCCESS,
  RESET_PASSWORD_USER_ERROR,
  HIDE_MODAL,
  HIDE_LOADING,
  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_ERROR,
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_ERROR,
} from "./types";

import axios from "axios";
import { API_URL, PAGE_LIMIT } from "../../constants";
import LOADING from "./loading_key";

export function getUsers(value) {
  return (dispatch) => {
    dispatch({ type: GET_USERS_REQUEST });

    let params = {
      ...value,
      page: !!value.pageKey ? value.pageKey : 1,
      limit: PAGE_LIMIT,
    };

    axios
      .get(`${API_URL}/users`, {
        params: {
          ...params,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getUsers,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_USERS_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getUsers,
        });
      });
  };
}

export function createUser(value) {
  return (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });

    axios
      .post(`${API_URL}/user`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createUser,
        });
        dispatch({
          type: CREATE_USER_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("สร้าง ผู้ใช้งาน สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.createUser,
        });
        dispatch({
          type: CREATE_USER_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function editUser(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_USER_REQUEST });

    axios
      .put(`${API_URL}/user`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editUser,
        });
        dispatch({
          type: EDIT_USER_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("แก้ไข ผู้ใช้งาน สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editUser,
        });
        dispatch({
          type: EDIT_USER_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function deleteUser(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });

    axios
      .delete(`${API_URL}/user/${id}`)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteUser,
        });
        dispatch({
          type: DELETE_USER_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("ลบ ผู้ใช้งาน สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.deleteUser,
        });
        dispatch({
          type: DELETE_USER_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function changeStatus(value) {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS_REQUEST });

    axios
      .put(`${API_URL}/user/approve`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.changeStatus,
        });
        dispatch({
          type: CHANGE_STATUS_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("เปลี่ยนสถานะสำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.changeStatus,
        });
        dispatch({
          type: CHANGE_STATUS_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function resetPasswordUser(value) {
  return (dispatch) => {
    dispatch({ type: RESET_PASSWORD_USER_REQUEST });

    axios
      .put(`${API_URL}/user/resetpassword`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.resetPasswordUser,
        });
        dispatch({
          type: RESET_PASSWORD_USER_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("เปลี่ยนรหัสผ่านสำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.resetPasswordUser,
        });
        dispatch({
          type: RESET_PASSWORD_USER_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}

export function getUserRoles() {
  return (dispatch) => {
    dispatch({ type: GET_ROLES_REQUEST });

    axios
      .get(`${API_URL}/userroles`)
      .then((response) => {
        dispatch({
          type: GET_ROLES_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getUserRoles,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ROLES_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getUserRoles,
        });
      });
  };
}
