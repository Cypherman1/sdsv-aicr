import axios from "axios";
import { IMG_UPLOAD, LIST_IMG } from "./type";
import { api_url } from "../conf";

export const uploadImg = formData => async dispatch => {
  try {
    const res = await axios.post(`${api_url}/api/images`, formData, {});
    dispatch({ type: IMG_UPLOAD, payload: res.data });
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

export const listImg = () => async dispatch => {
  try {
    var imgs = await axios.get(`${api_url}/api/images`);
    dispatch({
      type: LIST_IMG,
      payload: imgs.data.map(img => ({
        ...img,
        url: `${api_url}/api/images/${img.uid}`
      }))
    });
    return { success: true };
  } catch (err) {
    return { success: false, err };
  }
};

export const delImg = uid => async dispatch => {
  try {
    await axios.delete(`${api_url}/api/images/${uid}`);
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};
