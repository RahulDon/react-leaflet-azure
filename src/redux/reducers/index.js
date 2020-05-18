import { combineReducers } from "redux";
import dashboard from "./dashboardReducer";
import apiCallStatusReducer from "./apiStatusReducer";
import authReducer from "./authenticationReducer";

const rootReducer = combineReducers({
  dashboard,
  authReducer,
  apiCallStatusReducer
});

export default rootReducer;
