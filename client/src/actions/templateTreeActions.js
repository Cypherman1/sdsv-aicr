import axios from "axios";
import { reset } from "redux-form";
import {
  LOAD_TEMPLTE_TREE,
  SET_EXPANDED,
  SET_SELECTED,
  SET_TEMPLATE_MODAL_VISIBLE,
  SET_MODAL_ACTION,
  APPEND_EXPANDED,
  SET_UPDATING,
  ADD_NEW_TEMPLATE,
  ADD_NEW_FOLDER,
  REMOVE_TEMPLATE_FOLDER,
  RENAME_TEMPLATE_FOLDER
} from "./type";

export const loadTplTree = () => async dispatch => {
  try {
    const res = await axios.get(`/api/template/all`);
    dispatch({ type: LOAD_TEMPLTE_TREE, payload: res.data });
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
};
export const resetTForm = () => async dispatch => {
  dispatch(reset("tmodal"));
};
export const removeTemplateFolder = nodeId => async dispatch => {
  try {
    const res = await axios.post(`/api/template/remove`, {
      _id: nodeId
    });
    dispatch({ type: LOAD_TEMPLTE_TREE, payload: [res.data] });
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
};
export const addNewTemplate = (parentId, label, isLeaf) => async dispatch => {
  try {
    const res = await axios.post(`/api/template/addtokey`, {
      parentId,
      label,
      isLeaf
    });

    dispatch({ type: LOAD_TEMPLTE_TREE, payload: [res.data.tree] });

    dispatch({
      type: SET_SELECTED,
      payload: { selected: res.data.id, istemplate: isLeaf }
    });

    dispatch({
      type: APPEND_EXPANDED,
      payload: parentId
    });

    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
};

export const setUpdating = loading => ({
  type: SET_UPDATING,
  payload: loading
});

export const setModalAction = modalAction => ({
  type: SET_MODAL_ACTION,
  payload: modalAction
});

export const setExpanded = expanded => ({
  type: SET_EXPANDED,
  payload: expanded
});

export const appendExpanded = expanded => ({
  type: APPEND_EXPANDED,
  payload: expanded
});

export const setTplModalVisible = visible => ({
  type: SET_TEMPLATE_MODAL_VISIBLE,
  payload: visible
});

export const setSelected = selected => async dispatch => {
  try {
    const res = await axios.post(`/api/template/istemplate`, { _id: selected });
    dispatch({
      type: SET_SELECTED,
      payload: {
        selected,
        istemplate: res.data.isTemplate,
        label: res.data.label
      }
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
};
