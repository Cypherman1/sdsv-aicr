import axios from "axios";
import { reset } from "redux-form";
import { listImg } from "./imgUploadActions";
import { getExtractTemplate } from "./commonActions";
import { api_url } from "../conf";
import {
  LOAD_TEMPLTE_TREE,
  SET_EXPANDED,
  SET_SELECTED,
  SET_TEMPLATE_MODAL_VISIBLE,
  SET_MODAL_ACTION,
  APPEND_EXPANDED,
  SET_UPDATING,
  LIST_IMG,
  GET_EXTRACT_TEMPLATE,
  ADD_NEW_TEMPLATE,
  ADD_NEW_FOLDER,
  REMOVE_TEMPLATE_FOLDER,
  RENAME_TEMPLATE_FOLDER,
  SET_CURRENT_IMG
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
      isLeaf,
      templateId: "0"
    });

    dispatch({ type: LOAD_TEMPLTE_TREE, payload: [res.data.tree] });

    dispatch({
      type: SET_SELECTED,
      payload: { selected: res.data.id, istemplate: isLeaf, templateId: "0" }
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

export const setSelected = (
  isselected,
  common,
  imgUpload
) => async dispatch => {
  try {
    // data extraction
    const res = await axios.post(`/api/template/istemplate`, {
      _id: isselected
    });
    dispatch({
      type: SET_SELECTED,
      payload: {
        selected: isselected,
        istemplate: res.data.isTemplate,
        label: res.data.label,
        templateId: res.data.templateId
      }
    });
    // Get images uploaded for the template
    var imgs = await axios.post(`api/template/get_imgs`, {
      templateId: res.data.templateId
    });

    dispatch({
      type: LIST_IMG,
      payload: imgs.data.map(img => ({
        uid: img.imgId,
        name: `image${img.imgId}`,
        url: `${api_url}/api/images/${img.imgId}`
      }))
    });
    // Set default current image
    dispatch({
      type: SET_CURRENT_IMG,
      payload:
        imgs.length === 0
          ? "./assets/img/no-image.png"
          : `${api_url}/api/images/${imgs.data[0].imgId}`
    });

    // Get and set template field configuration
    const res1 = await axios.get(
      `${api_url}/api/templates/${res.data.templateId}`
    );
    if (res1.data.status === "success") {
      dispatch({ type: GET_EXTRACT_TEMPLATE, payload: res1.data.data });
    } else {
      dispatch({ type: GET_EXTRACT_TEMPLATE, payload: undefined });
    }
    if (common.mainMenuId === 1) {
      // Set default current image
      if (common.editorInstance) {
        await common.editorInstance.loadImageFromURL(
          imgs.length === 0
            ? "./assets/img/no-image.png"
            : `${api_url}/api/images/${imgs.data[0].imgId}`,
          "noimg"
        );
      }
      //Reset extracted form
      dispatch(reset("eform"));
    } else if (common.mainMenuId === 2) {
      //Template Editor
      common.canvasRef.handler.workareaHandler.setImage(
        imgs.length === 0
          ? "./assets/img/no-image.png"
          : `${api_url}/api/images/${res1.data.data.image_source}`,
        false,
        () => {
          const area = common.canvasRef.handler.workarea;

          if (res1.data.status === "success") {
            common.canvasRef.handler.clear();
            res1.data.data.template_config_fields.map(field => {
              if (field.data_type !== "group") {
                const option = {
                  type: "rect",
                  id: field.id,
                  name: field.name,
                  width: field.size.width,
                  height: field.size.height
                };
                const object = common.canvasRef.handler.add(option);
                common.canvasRef.handler.setByObject(
                  object,
                  "top",
                  area.top + field.position.top
                );
                common.canvasRef.handler.setByObject(
                  object,
                  "left",
                  area.left + field.position.left
                );
                common.canvasRef.handler.setByObject(
                  object,
                  "borderColor",
                  "#ff0000"
                );
              }
            });
          }
        }
      );
    }

    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false, error: err };
  }
};
