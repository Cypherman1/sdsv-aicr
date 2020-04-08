import axios from "axios";
import { change, reset } from "redux-form";
import { SET_CURRENT_IMG, SET_LOADING, SET_NLP_FLAG } from "./type";

import { api_url, api_token } from "../conf";

export const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading
});

export const resetForm = () => async dispatch => {
  dispatch(reset("eform"));
};

export const setCurrentImg = current_img => ({
  type: SET_CURRENT_IMG,
  payload: current_img
});

export const setNLPFlag = nlp_f => ({
  type: SET_NLP_FLAG,
  payload: nlp_f
});

export const extractData = (uid, templateId, nlp_f) => async dispatch => {
  try {
    let res;
    if (templateId === "1") {
      res = await axios.post(
        `http://107.120.70.222:4000/api/hw/${uid}?nlp=${nlp_f}`,
        {
          headers: {
            Authorization: `Basic ${api_token}`
          }
        }
      );
    } else {
      res = await axios.post(`${api_url}/api/aicr/extract`, {
        headers: {
          Authorization: `Basic ${api_token}`
        },
        template_id: templateId,
        image_id: uid,
        nlp: nlp_f
      });
    }
    res.data.map(edata => {
      if (!(edata.value instanceof Array)) {
        dispatch(change("eform", edata.name, edata.value));
      } else {
        if (edata.data_type !== "group") {
          edata.value.map(evalue => {
            dispatch(
              change("eform", `${edata.name}.${evalue.name}`, evalue.value)
            );
          });
        } else {
          edata.value.map(evalue => {
            dispatch(change("eform", evalue.name, evalue.value));
          });
        }
      }
    });

    return { success: true };
  } catch (err) {
    return { success: false, err };
  }
};
