import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// const initialState = {
//   showMapIcon: false,
//   allocationData: []
// };

export default function allocationReducer(state = initialState, action) {
  let newState = { ...state };
  //let newState = Object.assign(state, {});
  //let newState = state;
  switch (action.type) {
    case types.SAVE_ALLOCATION:
      let new_state = [...newState.allocationData];
      new_state.push(action.allocationData); //This code will be deleted in future
      newState.allocationData = new_state;
      return newState;

    case types.UPDATE_ALLOCATION:
      //This code will be deleted in future
      for (let i = 0; i < newState.allocationData.length; i++) {
        if (newState.allocationData[i].id === action.updatedAllocationData.id) {
          newState.allocationData = newState.updatedAllocationData;
          return newState;
        }
      }
      return newState;

    case types.DELETE_ALLOCATION:
      for (let i = 0; i < newState.allocationData.length; i++) {
        if (newState.allocationData[i].id === action.id) {
          newState.allocationData.splice(i, 1);
          return newState;
        }
      }
      return newState;

    default:
      return state;
  }
}
