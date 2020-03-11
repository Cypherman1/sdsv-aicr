import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import commonReducer from "./commonReducer";
import imgUploadReducer from "./imgUploadReducer";
import dataExtractReducer from "./dataExtractReducer";

export default combineReducers({
  auth: authReducer,
  common: commonReducer,
  form: formReducer,
  imgUpload: imgUploadReducer,
  dataExtract: dataExtractReducer
});
