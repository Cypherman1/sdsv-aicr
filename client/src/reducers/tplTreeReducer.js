import {
  LOAD_TEMPLTE_TREE,
  SET_SELECTED,
  SET_EXPANDED,
  SET_TEMPLATE_MODAL_VISIBLE,
  APPEND_EXPANDED,
  SET_MODAL_ACTION,
  SET_UPDATING
} from "../actions/type";

const INITIAL_STATE = {
  treeData: [],
  selected: "5e7838944f0d94548138c0cc",
  expanded: ["5e7833d0c7b9ee53ea9f148d"],
  isTemplate: true,
  tmlVisible: false,
  modalAction: "",
  selectedLabel: "",
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_TEMPLTE_TREE:
      return { ...state, treeData: action.payload };
    case APPEND_EXPANDED:
      return { ...state, expanded: [...state.expanded, action.payload] };
    case SET_EXPANDED:
      return { ...state, expanded: action.payload };
    case SET_TEMPLATE_MODAL_VISIBLE:
      return { ...state, tmlVisible: action.payload };
    case SET_MODAL_ACTION:
      return { ...state, modalAction: action.payload };
    case SET_UPDATING:
      return { ...state, loading: action.payload };
    case SET_SELECTED:
      return {
        ...state,
        selected: action.payload.selected,
        isTemplate: action.payload.istemplate,
        selectedLabel: action.payload.label
      };
    default:
      return state;
  }
};
