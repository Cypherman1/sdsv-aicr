import {
  CMN_TOGGLE_SIDER,
  CMD_SET_SIDER_COLLAPSED,
  CMD_SET_HAS_ERR,
  GET_EXTRACT_TEMPLATE,
  SET_ACTIVE_ASIDE_TAB,
  SET_SELECTED_TEMPLATE,
  SET_EDITOR_INSTANCE,
  TOGGLE_ASDIDE_APP
} from "./type";
import axios from "axios";
import { api_url } from "../conf";
// import ExtractTemplate from "../views/DataExtraction/Fields.json";
// import IDTemplate from "../views/DataExtraction/FieldsID.json";

export const getExtractTemplate = id => async dispatch => {
  try {
    console.log(`${api_url}/api/templates/${id}`);
    const res = await axios.get(`${api_url}/api/templates/${id}`);
    if (res.data.status === "success") {
      dispatch({ type: GET_EXTRACT_TEMPLATE, payload: res.data.data });
    } else {
      dispatch({ type: GET_EXTRACT_TEMPLATE, payload: undefined });
    }

    return { success: true };
  } catch (err) {
    dispatch({ type: GET_EXTRACT_TEMPLATE, payload: undefined });
    return { success: false, err };
  }
};

export const setEditorInstance = editorInstance => ({
  type: SET_EDITOR_INSTANCE,
  payload: editorInstance
});

export const toggleSider = () => ({
  type: CMN_TOGGLE_SIDER
});

export const toggleAsideApp = () => ({
  type: TOGGLE_ASDIDE_APP
});

export const setHasError = error => ({
  type: CMD_SET_HAS_ERR,
  payload: error
});

export const setSelectedTemplate = selectedTemplate => ({
  type: SET_SELECTED_TEMPLATE,
  payload: selectedTemplate
});

export const setActiveAsideTab = activeAsideTab => ({
  type: SET_ACTIVE_ASIDE_TAB,
  payload: activeAsideTab
});

export const setSiderCollapsed = sider_collapsed => ({
  type: CMD_SET_SIDER_COLLAPSED,
  payload: sider_collapsed
});
