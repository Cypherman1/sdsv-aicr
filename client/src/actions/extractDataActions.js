import axios from "axios";
import { change } from "redux-form";
import {
  SET_CURRENT_IMG,
  EXTRACT_DATA,
  SET_NAME,
  SET_BIRTHDAY,
  SET_NATION,
  SET_NOHOME1,
  SET_STREETHOME1,
  SET_WARDHOME1,
  SET_DISTRICTHOME1,
  SET_CITYHOME1,
  SET_PHONENUMBER,
  SET_LOADING,
  RESET_FORM,
  SET_NLP_FLAG
} from "./type";

import { api_url } from "../conf";
import { ExtractData } from "../views/DataExtraction/ExtractData";

export const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading
});

export const resetForm = () => ({
  type: RESET_FORM
});

export const setCurrentImg = current_img => ({
  type: SET_CURRENT_IMG,
  payload: current_img
});

export const setNLPFlag = nlp_f => ({
  type: SET_NLP_FLAG,
  payload: nlp_f
});

export const extractData = (uid, nlp_f) => async dispatch => {
  try {
    //const res = await axios.post(`${api_url}/api/hw/${uid}?nlp=${nlp_f}`);
    //dispatch({ type: EXTRACT_DATA, payload: res.data });
    ExtractData.map(edata => {
      if (!(edata.value instanceof Array)) {
        dispatch(change("eform", edata.name, edata.value));
      } else {
        edata.value.map(evalue => {
          dispatch(
            change("eform", `${edata.name}.${evalue.name}`, evalue.value)
          );
        });
      }
    });
    dispatch(change("eform", "ho_ten", "abc"));
    // dispatch(change("eform", "loai_hop_dong.hd_di_lam", true));
    return { success: true };
  } catch (err) {
    return { success: false, err };
  }
};

export const setName = name => ({
  type: SET_NAME,
  payload: name
});

export const setBirthday = birthday => ({
  type: SET_BIRTHDAY,
  payload: birthday
});

export const setNation = nation => ({
  type: SET_NATION,
  payload: nation
});

export const setNohome1 = nohome1 => ({
  type: SET_NOHOME1,
  payload: nohome1
});

export const setStreethome1 = streethome1 => ({
  type: SET_STREETHOME1,
  payload: streethome1
});

export const setWardhome1 = wardhome1 => ({
  type: SET_WARDHOME1,
  payload: wardhome1
});

export const setDistricthome1 = districthome1 => ({
  type: SET_DISTRICTHOME1,
  payload: districthome1
});

export const setCityhome1 = cityhome1 => ({
  type: SET_CITYHOME1,
  payload: cityhome1
});

export const setPhonenumber = phonenumber => ({
  type: SET_PHONENUMBER,
  payload: phonenumber
});
