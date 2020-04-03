import axios from "axios";
import { IMG_UPLOAD, LIST_IMG } from "./type";
import { api_url } from "../conf";

export const uploadImg = (formData, templateId) => async dispatch => {
  try {
    let res;
    if (templateId === "1") {
      res = await axios.post(
        `http://107.120.70.222:4000/api/images`,
        formData,
        {}
      );
    } else {
      res = await axios.post(`${api_url}/api/images`, formData, {});
    }
    await axios.post("/api/template/add_img", {
      templateId,
      imgId: res.data.data
    });
    dispatch({ type: IMG_UPLOAD, payload: res.data });
    return { success: true, url: `${api_url}/api/images/${res.data.data}` };
  } catch (err) {
    return { success: false };
  }
};

export const listImg = templateId => async dispatch => {
  try {
    var imgs = await axios.post(`api/template/get_imgs`, { templateId });
    dispatch({
      type: LIST_IMG,
      payload: imgs.data.map(img => ({
        uid: img.imgId,
        name: `image${img.imgId}`,
        url: `${api_url}/api/images/${img.imgId}`
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

    await axios.post("/api/template/del_img", { imgId: uid });

    return { success: true };
  } catch (err) {
    return { success: false };
  }
};
