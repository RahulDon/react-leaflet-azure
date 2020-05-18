import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusAction";
import { v4 as uuidv4 } from "uuid";

export function loginSuccess(authData) {
  return { type: types.LOGIN_SUCCESS, authData };
}

export function login(loginData) {
  return async function(dispatch) {
    await dispatch(beginApiCall());

    //this code will be removed in future

    let authData = {
      id: uuidv4(),
      username: loginData.email,
      token: uuidv4()
    };

    await dispatch(loginSuccess(authData));

    //dispatch(apiCallError(authData));
  };
}

export function deleteToken() {
  return { type: types.LOGOUT };
}

export function logout() {
  return async function(dispatch) {
    await dispatch(deleteToken());
  };
}

export function signin(signinData) {
  return { type: types.HIDE_MAP_ICON };
}
