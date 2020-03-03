import { combineReducers } from "redux";
import authReducer from "./authReducer";
import commonReducer from "./commonReducer";
import imgUploadReducer from "./imgUploadReducer";
import dataExtractReducer from "./dataExtractReducer";

export default combineReducers({
  auth: authReducer,
  common: commonReducer,
  imgUpload: imgUploadReducer,
  dataExtract: dataExtractReducer
});
