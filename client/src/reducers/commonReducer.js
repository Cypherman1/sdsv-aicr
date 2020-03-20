import {
  CMN_TOGGLE_SIDER,
  CMD_SET_SIDER_COLLAPSED,
  CMD_SET_HAS_ERR,
  GET_EXTRACT_TEMPLATE,
  SET_ACTIVE_ASIDE_TAB,
  SET_SELECTED_TEMPLATE,
  SET_EDITOR_INSTANCE
} from "../actions/type";

const INITIAL_STATE = {
  sider_collapsed: false,
  hasError: false,
  error: "",
  extractTemplate: {},
  activeAsideTab: "1",
  selectedTemplate: "1",
  editorInstance: null,
  test: "abc"
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CMD_SET_SIDER_COLLAPSED:
      return { ...state, sider_collapsed: action.payload };
    case SET_EDITOR_INSTANCE:
      return { ...state, editorInstance: action.payload };
    case SET_ACTIVE_ASIDE_TAB:
      return { ...state, activeAsideTab: action.payload };
    case SET_SELECTED_TEMPLATE:
      return { ...state, selectedTemplate: action.payload };
    case GET_EXTRACT_TEMPLATE:
      return { ...state, extractTemplate: action.payload };
    case CMD_SET_HAS_ERR:
      return {
        ...state,
        hasError: action.payload.hasError,
        error: action.payload.err
      };
    case CMN_TOGGLE_SIDER:
      return { ...state, sider_collapsed: !state.sider_collapsed };
    default:
      return state;
  }
};
