import {
  GET_OFFICEOFQUALIFICATION_REQUEST,
  GET_OFFICEOFQUALIFICATION_SUCCESS,
  GET_OFFICEOFQUALIFICATION_ERROR,
  EDIT_OFFICEOFQUALIFICATION_REQUEST,
  EDIT_OFFICEOFQUALIFICATION_SUCCESS,
  EDIT_OFFICEOFQUALIFICATION_ERROR,
  HIDE_LOADING,
} from "./types";
import axios from "axios";
import { API_URL } from "../../constants";
import LOADING from "./loading_key";

export function getOfficeOfQualification() {
  return (dispatch) => {
    dispatch({ type: GET_OFFICEOFQUALIFICATION_REQUEST });

    axios
      .get(`${API_URL}/setting/qualified`)
      .then((response) => {
        dispatch({
          type: GET_OFFICEOFQUALIFICATION_SUCCESS,
          payload: response.data,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getOfficeOfQualification,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_OFFICEOFQUALIFICATION_ERROR,
          payload: error,
        });
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.getOfficeOfQualification,
        });
      });
  };
}
export function editOfficeOfQualification(value) {
  return (dispatch) => {
    dispatch({ type: EDIT_OFFICEOFQUALIFICATION_REQUEST });

    axios
      .put(`${API_URL}/setting/qualified`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editOfficeOfQualification,
        });
        dispatch({
          type: EDIT_OFFICEOFQUALIFICATION_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert(
          "บันทึกการตั้งค่าเกี่ยวกับเรา - ทำเนียบผู้ทรงคุณวุฒิ	 สำเร็จ",
        );
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.editOfficeOfQualification,
        });
        dispatch({
          type: EDIT_OFFICEOFQUALIFICATION_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: ${error.response.data.StatusMessage}</p>`,
        });
      });
  };
}
