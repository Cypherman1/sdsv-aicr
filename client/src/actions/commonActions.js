import { CMN_TOGGLE_SIDER, CMD_SET_SIDER_COLLAPSED } from "./type";

export const toggleSider = () => ({
  type: CMN_TOGGLE_SIDER
});

export const setSiderCollapsed = sider_collapsed => ({
  type: CMD_SET_SIDER_COLLAPSED,
  payload: sider_collapsed
});
