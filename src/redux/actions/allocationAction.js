import * as types from "./actionTypes";
import {
  beginApiCall,
  stopApiCall,
  apiCallError,
  delay
} from "./apiStatusAction";
import { v4 as uuidv4 } from "uuid";

export function saveAllocationSuccess(allocationData) {
  return { type: types.SAVE_ALLOCATION, allocationData };
}

export function saveAllocation(allocationData) {
  return async function(dispatch) {
    await dispatch(beginApiCall());

    //this code will be removed in future

    allocationData.id = uuidv4();
    allocationData.status = "Active";

    await delay(3000);
    await dispatch(saveAllocationSuccess(allocationData));
    await dispatch(stopApiCall());
    //dispatch(apiCallError(authData));
  };
}

export function updateAllocationSuccess(updatedAllocationData) {
  return { type: types.UPDATE_ALLOCATION, updatedAllocationData };
}

export function updateAllocation(updatedAllocationData) {
  return async function(dispatch) {
    await dispatch(beginApiCall());

    //this code will be removed in future
    await dispatch(updateAllocationSuccess(updatedAllocationData));

    //dispatch(apiCallError(authData));
  };
}

export function deleteAllocationSuccess(id) {
  return { type: types.DELETE_ALLOCATION, id };
}

export function deleteAllocation(id) {
  return async function(dispatch) {
    await dispatch(beginApiCall());

    //this code will be removed in future

    await dispatch(deleteAllocationSuccess(id));

    //dispatch(apiCallError(authData));
  };
}
