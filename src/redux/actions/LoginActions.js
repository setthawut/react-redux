import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  HIDE_LOADING,
  PROJECT_KEY,
} from "./types";

import axios from "axios";
import { API_URL } from "../../constants";
import LOADING from "./loading_key";
import { useHistory } from "react-router-dom";
import { push } from "connected-react-router";

export function loginUser(username, password) {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });

    axios
      .post(`${API_URL}/login`, { username, password })
      .then((response) => {
        loginUserSuccess(
          dispatch,
          response.data.Result.Name,
          response.data.Result.Role,
          response.data.Result.UserId,
          !!response.data.Result.Institution
            ? response.data.Result.Institution
            : "",
        );
      })
      .catch((error) => {
        console.log(error);
        vex.dialog.alert("ชื่อผู้ใช้งาน หรือ รหัสผ่าน ไม่ถูกต้อง");
        loginUserError(dispatch, error);
      });
  };
}

export function isLogin() {
  return (dispatch) => {
    const user = localStorage.getItem(PROJECT_KEY);

    if (user) {
      const userObj = JSON.parse(user);

      axios
        .get(`${API_URL}/me`)
        .then(() => {
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: userObj,
          });
        })
        .catch((error) => {
          if (error.response.status == 401) {
            console.log("401");
            vex.dialog.alert("กรุณาล็อคอินอีกครั้ง");
            logout(dispatch);
          } else if (error.response.status == 410) {
            console.log("410");
            vex.dialog.alert("กรุณาติดต่อทีมพัฒนาระบบ");
            logout(dispatch);
          } else {
            logout(dispatch);
          }
        });
    } else {
      logout(dispatch);
    }
  };
}

function loginUserSuccess(dispatch, user, role, userId, institution) {
  let data = {
    user: user,
    roles:
      role === "adminKoWoLo"
        ? role.split("K")[0]
        : role === "adminThoSo"
        ? "user"
        : "",
    userId,
    institution,
    // views: Object.keys(role).length > 0 ? role.Views : [],
    // authorize: keepAuthorizes(Object.keys(role).length > 0 ? [role] : []),
  };

  localStorage.setItem(PROJECT_KEY, JSON.stringify(data));

  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: data,
  });

  dispatch({
    type: HIDE_LOADING,
    payload: LOADING.login,
  });
  dispatch(push("/"));
}

const loginUserError = (dispatch, error) => {
  dispatch({
    type: LOGIN_USER_ERROR,
    payload: error,
  });

  dispatch({
    type: HIDE_LOADING,
    payload: LOADING.login,
  });
};

export function logoutUser() {
  return (dispatch) => {
    logout(dispatch);
  };
}

function logout(dispatch) {
  axios
    .get(`${API_URL}/logout`)
    .then(() => {
      axios.defaults.headers.common["Session"] = "";
      localStorage.removeItem(PROJECT_KEY);
      dispatch(push("/login"));
    })
    .catch((error) => {
      console.log(error);
    });

  dispatch({
    type: LOGOUT_USER,
  });
}
