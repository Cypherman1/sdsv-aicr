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
            uid: "-4",
            name: "image.png",
            status: "done",
            url: action.payload.path
          }
        ]
      };
    default:
      return state;
  }
};
