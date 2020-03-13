import {
  CMN_TOGGLE_SIDER,
  CMD_SET_SIDER_COLLAPSED,
  CMD_SET_HAS_ERR
} from "../actions/type";

const INITIAL_STATE = {
  sider_collapsed: false,
  hasError: false,
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CMD_SET_SIDER_COLLAPSED:
      return { ...state, sider_collapsed: action.payload };
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
