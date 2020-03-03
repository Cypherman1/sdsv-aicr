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
  SET_PHONENUMBER
} from "./type";

import axios from "axios";

export const setCurrentImg = current_img => ({
  type: SET_CURRENT_IMG,
  payload: current_img
});

export const extractData = uid => async dispatch => {
  try {
    const res = await axios.post(`http://192.168.0.61:3000/api/hw/${uid}`);
    dispatch({ type: EXTRACT_DATA, payload: res.data });
  } catch (err) {}
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
