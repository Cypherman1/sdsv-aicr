import { CMN_TOGGLE_SIDER, CMD_SET_SIDER_COLLAPSED } from "../actions/type";

const INITIAL_STATE = {
  sider_collapsed: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CMD_SET_SIDER_COLLAPSED:
      return { ...state, sider_collapsed: action.payload };
    case CMN_TOGGLE_SIDER:
      return { ...state, sider_collapsed: !state.sider_collapsed };
    default:
      return state;
  }
};
