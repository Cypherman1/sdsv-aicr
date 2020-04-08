import React, { Component } from "react";
import PropTypes from "prop-types";
import i18n from "i18next";

import { FlexBox, FlexItem } from "../flex";
import ImageMapList from "./ImageMapList";
import { CommonButton } from "../common";
import Icon from "../icon/Icon";
import { Col, Row, Label } from "reactstrap";
import { TreeSelect } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../../actions";

const { TreeNode } = TreeSelect;

const renderNode = treeData => (
  <TreeNode
    value={treeData.nodeId}
    title={treeData.label}
    key={treeData.nodeId}
  >
    {treeData.children ? treeData.children.map(data => renderNode(data)) : null}
  </TreeNode>
);

class AICRImageEditorToolbar extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
    selectedItem: PropTypes.object
  };
  state = {
    value: undefined
  };

  onChange = async value => {
    const { common, imgUpload, setSelected } = this.props;
    await setSelected(value, common, imgUpload);
  };

  render() {
    const { canvasRef, selectedItem, tplTree } = this.props;
    const isCropping = canvasRef
      ? canvasRef.handler.interactionMode === "crop"
      : false;
    return (
      <FlexBox
        className="rde-editor-header-toolbar-container pt-2 pb-5"
        flex="1"
      >
        <Col className="pl-0" xs="12" sm="6">
          <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-list">
            <Label className="pt-2 pl-2">Template</Label>
            <TreeSelect
              style={{ width: "100%", marginLeft: "10px" }}
              value={tplTree.selected}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder="Please select"
              treeDefaultExpandAll
              onChange={this.onChange}
            >
              {tplTree.treeData[0] ? renderNode(tplTree.treeData[0]) : null}
            </TreeSelect>
          </FlexItem>
        </Col>
        <Col xs="12" sm="6" className="justify-content-end">
          <Row className="justify-content-end">
            <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-crop">
              <CommonButton
                className="rde-action-btn"
                shape="circle"
                disabled={
                  canvasRef ? !canvasRef.handler.cropHandler.validType() : true
                }
                onClick={() => canvasRef.handler.cropHandler.start()}
                icon="crop"
                tooltipTitle={i18n.t("action.crop")}
              />
              <CommonButton
                className="rde-action-btn"
                shape="circle"
                disabled={
                  canvasRef ? !canvasRef.handler.cropHandler.cropRect : true
                }
                onClick={() => canvasRef.handler.cropHandler.finish()}
                icon="check"
                tooltipTitle={i18n.t("action.crop-save")}
              />
              <CommonButton
                className="rde-action-btn"
                shape="circle"
                disabled={
                  canvasRef ? !canvasRef.handler.cropHandler.cropRect : true
                }
                onClick={() => canvasRef.handler.cropHandler.cancel()}
                icon="times"
                tooltipTitle={i18n.t("action.crop-cancel")}
              />
            </FlexItem>
            <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-operation">
              <CommonButton
                className="rde-action-btn"
                shape="circle"
                disabled={isCropping}
                onClick={() => canvasRef.handler.saveImage()}
                icon="image"
                tooltipTitle={i18n.t("action.image-save")}
              />
              <CommonButton
                className="rde-action-btn"
                shape="circle"
                disabled={isCropping}
                onClick={() => canvasRef.handler.duplicate()}
                icon="clone"
                tooltipTitle={i18n.t("action.clone")}
              />
              <CommonButton
                className="rde-action-btn"
                shape="circle"
                disabled={isCropping}
                onClick={() => canvasRef.handler.remove()}
                icon="trash"
                tooltipTitle={i18n.t("action.delete")}
              />
            </FlexItem>
            <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-history">
              <CommonButton
                className="rde-action-btn"
                disabled={
                  isCropping ||
                  (canvasRef &&
                    !canvasRef.handler.transactionHandler.undos.length)
                }
                onClick={() => canvasRef.handler.transactionHandler.undo()}
              >
                <Icon name="undo-alt" style={{ marginRight: 8 }} />
                Undo
              </CommonButton>
              <CommonButton
                className="rde-action-btn"
                disabled={
                  isCropping ||
                  (canvasRef &&
                    !canvasRef.handler.transactionHandler.redos.length)
                }
                onClick={() => canvasRef.handler.transactionHandler.redo()}
              >
                Redo
                <Icon name="redo-alt" style={{ marginLeft: 8 }} />
              </CommonButton>
            </FlexItem>
          </Row>
        </Col>
      </FlexBox>
    );
  }
}

const mapStateToProps = ({ imgUpload, dataExtract, common, tplTree }) => {
  return { imgUpload, dataExtract, common, tplTree };
};

export default connect(mapStateToProps, actions)(AICRImageEditorToolbar);

//export default AICRImageEditorToolbar;
