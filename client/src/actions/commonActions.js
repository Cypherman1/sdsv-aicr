import {
  CMN_TOGGLE_SIDER,
  CMD_SET_SIDER_COLLAPSED,
  CMD_SET_HAS_ERR
} from "./type";

export const toggleSider = () => ({
  type: CMN_TOGGLE_SIDER
});

export const setHasError = error => ({
  type: CMD_SET_HAS_ERR,
  payload: error
});

export const setSiderCollapsed = sider_collapsed => ({
  type: CMD_SET_SIDER_COLLAPSED,
  payload: sider_collapsed
});
