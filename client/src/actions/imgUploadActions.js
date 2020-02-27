import axios from "axios";
import { IMG_UPLOAD, LIST_IMG } from "./type";

export const uploadImg = formData => async dispatch => {
  try {
    const res = await axios.post("http://localhost:5000/upload", formData, {});
    dispatch({ type: IMG_UPLOAD, payload: res.data });
  } catch (err) {}
};

export const listImg = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:5000/imgslist");
    //console.log(res.data);
    dispatch({ type: LIST_IMG, payload: res.data });
  } catch (err) {}
};
