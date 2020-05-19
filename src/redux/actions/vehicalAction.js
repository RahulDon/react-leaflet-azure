import * as types from "./actionTypes";
import {
  beginApiCall,
  stopApiCall,
  apiCallError,
  delay
} from "./apiStatusAction";
import { v4 as uuidv4 } from "uuid";

export function saveVehicalSuccess(vehicalData) {
  return { type: types.SAVE_VEHICAL, vehicalData };
}

export function saveVehical(vehicalData) {
  return async function(dispatch) {
    await dispatch(beginApiCall());

    //this code will be removed in future

    vehicalData.id = uuidv4();
    vehicalData.createdDate = "03-06-1991";

    await delay(3000);
    await dispatch(saveVehicalSuccess(vehicalData));
    await dispatch(stopApiCall());

    //dispatch(apiCallError(authData));
  };
}

export function updateVehicalSuccess(updateVehicalData) {
  return { type: types.UPDATE_VEHICAL, updateVehicalData };
}

export function updateVehical(updateVehicalData) {
  return async function(dispatch) {
    await dispatch(beginApiCall());

    //this code will be removed in future
    await dispatch(updateVehicalSuccess(updateVehicalData));

    //dispatch(apiCallError(authData));
  };
}

export function deleteVehicalSuccess(authData) {
  return { type: types.DELETE_ALLOCATION, authData };
}

export function deleteDevice(id) {
  return async function(dispatch) {
    await dispatch(beginApiCall());

    //this code will be removed in future

    await dispatch(deleteVehicalSuccess(id));

    //dispatch(apiCallError(authData));
  };
}
