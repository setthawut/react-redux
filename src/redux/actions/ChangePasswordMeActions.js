import {
  CHANGE_PASSWORD_ME_REQUEST,
  CHANGE_PASSWORD_ME_SUCCESS,
  CHANGE_PASSWORD_ME_ERROR,
  HIDE_MODAL,
  HIDE_LOADING,
} from "./types";

import axios from "axios";
import { API_URL } from "../../constants";
import LOADING from "./loading_key";

export function changePasswordMe(value) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD_ME_REQUEST });

    axios
      .put(`${API_URL}/user/changepassword`, value)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.resetPasswordMe,
        });
        dispatch({
          type: CHANGE_PASSWORD_ME_SUCCESS,
          payload: response.data,
        });
        vex.dialog.alert("เปลี่ยนรหัสผ่าน สำเร็จ");
        dispatch({ type: HIDE_MODAL });
      })
      .catch((error) => {
        dispatch({
          type: HIDE_LOADING,
          payload: LOADING.resetPasswordMe,
        });
        dispatch({
          type: CHANGE_PASSWORD_ME_ERROR,
          payload: error,
        });
        vex.dialog.alert({
          unsafeMessage: `<p class='alert-error'>Error: รหัสผ่านปัจุบันไม่ถูกต้อง </p>`,
        });
      });
  };
}
