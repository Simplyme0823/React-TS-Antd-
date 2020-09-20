/** @format */

import { actionTypes } from "./index";
import { Dispatch } from "redux";
import { loginSys } from "../api/account";
import { setToken, setUsername } from "../utils/session";
import { push } from "connected-react-router";

const startLogin = () => {
  return {
    type: actionTypes.START_LOGIN,
  };
};

const loginSuccess = (payload: any) => {
  setToken(payload.token);
  setUsername(payload.username);
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload,
  };
};

const loginFailed = () => {
  return {
    type: actionTypes.LOGIN_FAILED,
  };
};

//{ login(payload:any)...略 } 属性会被传递到login组件的props属性中
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  login(payload: any) {
    dispatch(startLogin());
    loginSys(payload)
      .then(res => {
        const data = res.data;
        if (data.resCode === 0) {
          dispatch(loginSuccess(data.data));
          dispatch(push("/admin/clicklisten"));
        }
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(loginFailed());
      });
  },
});

// 15757173689@QQ.COM
// ASDFGHJKL
