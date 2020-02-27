import { combineReducers } from "redux";
import authReducer from "./authReducer";
import commonReducer from "./commonReducer";
import imgUploadReducer from "./imgUploadReducer";

export default combineReducers({
  auth: authReducer,
  common: commonReducer,
  imgUpload: imgUploadReducer
});
