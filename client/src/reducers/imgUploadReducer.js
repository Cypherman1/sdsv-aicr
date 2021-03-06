import { IMG_UPLOAD, LIST_IMG } from "../actions/type";

const INITIAL_STATE = {
  fileList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_IMG:
      return {
        ...state,
        fileList: action.payload
      };
    case IMG_UPLOAD:
      return {
        ...state,
        fileList: [
          ...state.fileList,
          {
            uid: action.payload.data,
            name: action.payload.data,
            status: "done",
            url: "http://192.168.0.61:3000/api/images/" + action.payload.data
          }
        ]
      };
    default:
      return state;
  }
};
