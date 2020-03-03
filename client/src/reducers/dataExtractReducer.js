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
  RESET_FORM
} from "../actions/type";

const INITIAL_STATE = {
  currentImg: "http://192.168.0.61:3000/api/images/50",
  exData: {},
  name: "",
  birthday: "",
  nation: "",
  nohome1: "",
  streethome1: "",
  wardhome1: "",
  districthome1: "",
  cityhome1: "",
  phonenumber: "",
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_CURRENT_IMG:
      return {
        ...state,
        currentImg: action.payload
      };
    case RESET_FORM:
      return {
        ...state,
        exData: {},
        name: "",
        birthday: "",
        nation: "",
        nohome1: "",
        streethome1: "",
        wardhome1: "",
        districthome1: "",
        cityhome1: "",
        phonenumber: "",
        loading: false
      };
    case EXTRACT_DATA:
      return {
        ...state,
        exData: action.payload,
        name: action.payload.NAME,
        birthday: action.payload.BIRTHDAY,
        nation: action.payload.NATION,
        nohome1: action.payload.NOHOME1,
        streethome1: action.payload.STREETHOME1,
        wardhome1: action.payload.WARDHOME1,
        districthome1: action.payload.DISTRICTHOME1,
        cityhome1: action.payload.CITYHOME1,
        phonenumber: action.payload.PHONENUMBER,
        loading: false
      };
    case SET_NAME:
      return {
        ...state,
        name: action.payload
      };
    case SET_BIRTHDAY:
      return {
        ...state,
        birthday: action.payload
      };
    case SET_NATION:
      return {
        ...state,
        nation: action.payload
      };
    case SET_NOHOME1:
      return {
        ...state,
        nohome1: action.payload
      };
    case SET_STREETHOME1:
      return {
        ...state,
        streethome1: action.payload
      };
    case SET_WARDHOME1:
      return {
        ...state,
        wardhome1: action.payload
      };
    case SET_DISTRICTHOME1:
      return {
        ...state,
        districthome1: action.payload
      };
    case SET_CITYHOME1:
      return {
        ...state,
        cityhome1: action.payload
      };
    case SET_PHONENUMBER:
      return {
        ...state,
        phonenumber: action.payload
      };
    default:
      return state;
  }
};
