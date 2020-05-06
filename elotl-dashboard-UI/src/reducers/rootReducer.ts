import { combineReducers } from "redux";
import dashboardReducer from "./dashboardReducer";
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
  dashboardReducer:dashboardReducer,
  homeReducer:homeReducer
});

export default rootReducer;
