import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Menu, Dropdown, Popconfirm } from "antd";

import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import TemplateModal from "./TemplateModal";
import { setTplModalVisible } from "../../actions";

const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: theme.palette.action.hover
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: "var(--tree-view-color)"
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
      backgroundColor: "transparent"
    }
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(0),
    borderBottomRightRadius: theme.spacing(0),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular
    }
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2)
    }
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit"
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0)
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1
  }
}));

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400
  }
});

const TemplateTree = ({
  common,
  tplTree,
  setExpanded,
  setSelected,
  setTplModalVisible,
  removeTemplateFolder,
  setModalAction
}) => {
  const classes = useStyles();

  const onNewTemplate = () => {
    setModalAction("New Template");
    setTplModalVisible(true);
  };

  const onNewFolder = () => {
    setModalAction("New Folder");
    setTplModalVisible(true);
  };

  const onRename = () => {
    setModalAction("Rename");
  };

  const onRemove = () => {
    setModalAction("Delete Confirmation");
    setTplModalVisible(true);
    //removeTemplateFolder(tplTree.selected);
  };

  const menuFile = (
    <Menu style={{ width: "200px" }}>
      <Menu.Item key="1">Edit</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">Copy</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Rename</Menu.Item>
      <Menu.Item key="4" onClick={onRemove}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const menuFolder = () => (
    <Menu style={{ width: "200px" }}>
      <Menu.Item key="1" onClick={onNewTemplate}>
        New Template
      </Menu.Item>
      <Menu.Item key="2" onClick={onNewFolder}>
        New Folder
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Copy</Menu.Item>
      <Menu.Item key="0">Paste</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" onClick={onRename}>
        Rename
      </Menu.Item>
      <Menu.Item key="5" onClick={onRemove}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const StyledTreeItem = props => {
    const classes = useTreeItemStyles();
    const {
      labelText,
      labelIcon: LabelIcon,
      color,
      bgColor,
      isTemplate,
      setTplModalVisible,
      ...other
    } = props;
    return (
      <TreeItem
        label={
          <Dropdown
            overlay={isTemplate ? menuFile : menuFolder(setTplModalVisible)}
            trigger={["contextMenu"]}
          >
            <div className={classes.labelRoot}>
              <LabelIcon color="inherit" className={classes.labelIcon} />
              <Typography variant="body2" className={classes.labelText}>
                {labelText}
              </Typography>
            </div>
          </Dropdown>
        }
        style={{
          "--tree-view-color": color,
          "--tree-view-bg-color": bgColor
        }}
        classes={{
          root: classes.root,
          content: classes.content
        }}
        {...other}
      />
    );
  };

  StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    isTemplate: PropTypes.bool,
    setTplModalVisible: PropTypes.func
  };

  const renderNode = treeData => (
    <StyledTreeItem
      isTemplate={treeData.isLeaf}
      key={treeData.nodeId}
      labelText={treeData.label}
      nodeId={treeData.nodeId}
      labelIcon={treeData.isLeaf ? DescriptionOutlinedIcon : FolderOpenIcon}
      color="#ffffff"
      bgColor="#1890ff"
    >
      {treeData.children
        ? treeData.children.map(data => renderNode(data))
        : null}
    </StyledTreeItem>
  );

  return [
    <TreeView
      key="1"
      className={classes.root}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      selected={tplTree.selected}
      expanded={tplTree.expanded}
      onNodeSelect={(event, value) => setSelected(value)}
      onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
    >
      {tplTree.treeData[0] ? renderNode(tplTree.treeData[0]) : null}
    </TreeView>,
    <TemplateModal key="2" />
  ];
};

const mapStateToProps = ({ dataExtract, common, imgUpload, tplTree }) => {
  return { dataExtract, common, imgUpload, tplTree };
};

export default connect(mapStateToProps, actions)(TemplateTree);
