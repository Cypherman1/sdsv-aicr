import axios from "axios";
import { IMG_UPLOAD } from "./type";

export const uploadImg = formData => async dispatch => {
  const res = await axios.post("http://localhost:5000/upload", formData, {});
  dispatch({ type: IMG_UPLOAD, payload: res.data });
};
