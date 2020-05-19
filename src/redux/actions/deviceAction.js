import * as types from "./actionTypes";
import {
  beginApiCall,
  stopApiCall,
  apiCallError,
  delay
} from "./apiStatusAction";
import { v4 as uuidv4 } from "uuid";

export function saveDeviceSuccess(deviceData) {
  return { type: types.SAVE_DEVICE, deviceData };
}

export function saveDevice(deviceData) {
  return async function(dispatch) {
    await dispatch(beginApiCall());

    //this code will be removed in future

    deviceData.id = uuidv4();
    deviceData.createdDate = "03-06-1991";

    await delay(3000);
    await dispatch(saveDeviceSuccess(deviceData));
    await dispatch(stopApiCall());

    //dispatch(apiCallError(authData));
  };
}

export function updateDeviceSuccess(updateDeviceData) {
  return { type: types.UPDATE_DEVICE, updateDeviceData };
}

export function updateDevice(updateDeviceData) {
  return async function(dispatch) {
    await dispatch(beginApiCall());

    //this code will be removed in future
    await dispatch(updateDeviceSuccess(updateDeviceData));

    //dispatch(apiCallError(authData));
  };
}

export function deleteDeviceSuccess(authData) {
  return { type: types.DELETE_DEVICE, authData };
}

export function deleteDevice(id) {
  return async function(dispatch) {
    await dispatch(beginApiCall());

    //this code will be removed in future

    await dispatch(deleteDeviceSuccess(id));

    //dispatch(apiCallError(authData));
  };
}
