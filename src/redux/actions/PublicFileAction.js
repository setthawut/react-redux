import {
  GET_PUBLICFILE_REQUEST,
  GET_PUBLICFILE_SUCCESS,
  GET_PUBLICFILE_ERROR,
  EDIT_PUBLICFILE_REQUEST,
  EDIT_PUBLICFILE_SUCCESS,
  EDIT_PUBLICFILE_ERROR,
  HIDE_LOADING,
} from "./types";
import axios from "axios";
import { API_URL } from "../../constants";
import LOADING from "./loading_key";

export function getPublicFile() {
  return (dispatch) => {
    dispatch({ type: GET_PUBLICFILE_REQUEST });

    axios
      .get(`${API_URL}/setting/publicfile`)
      .then((response) => {
        dispatch({
          type: GET_PUBLICFILE_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getPublicFile,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_PUBLICFILE_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getPublicFile,
        });
      });
  };
}
export function editPublicFile(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_PUBLICFILE_REQUEST });

    axios
      .put(`${API_URL}/setting/publicfile`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editPublicFile,
        });
        dispatch({
          type: EDIT_PUBLICFILE_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("บันทึกเอกสารเผยแพร่ สำเร็จ");
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editPublicFile,
        });
        dispatch({
          type: EDIT_PUBLICFILE_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}
