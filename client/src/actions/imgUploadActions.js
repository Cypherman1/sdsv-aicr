import axios from "axios";
import { IMG_UPLOAD, LIST_IMG, DEL_IMG } from "./type";

export const uploadImg = formData => async dispatch => {
  try {
    const res = await axios.post(
      "http://192.168.0.61:3000/api/images",
      formData,
      {}
    );
    dispatch({ type: IMG_UPLOAD, payload: res.data });
  } catch (err) {}
};

export const listImg = () => async dispatch => {
  try {
    var imgs = await axios.get("http://192.168.0.61:3000/api/images");
    //console.log(res.data);
    dispatch({
      type: LIST_IMG,
      payload: imgs.data.map(img => ({
        ...img,
        url: `http://192.168.0.61:3000/api/images/${img.uid}`
      }))
    });
  } catch (err) {}
};

export const delImg = uid => async dispatch => {
  try {
    var res = await axios.delete(`http://192.168.0.61:3000/api/images/${uid}`);
  } catch (err) {
    console.log(err);
  }
};
