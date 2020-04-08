import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { Upload, notification, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ExtractForm from "./ExtractForm";
import AICRImageEditor from "../EditorLib/components/imagemap/AICRImageEditor";

notification.config({
  placement: "bottomRight",
  bottom: 0,
  duration: 2
});

class DataExtraction extends Component {
  openNotificationWithIcon = (type, title, description) => {
    notification[type]({
      message: title,
      description: description
    });
  };
  handlePreview = async file => {
    const { resetForm, setCurrentImg, common } = this.props;
    resetForm();
    await common.aimvCanvasRef.handler.workareaHandler.setImage(
      file.url || file.preview
    );
    await setCurrentImg(file.url || file.preview);
  };
  handleRemove = async info => {
    const { delImg, listImg, tplTree } = this.props;
    await delImg(info.uid);
    await listImg(tplTree.selectedTemplateId);
  };
  handleChange = async info => {
    const { common, uploadImg, setCurrentImg, tplTree } = this.props;
    if (info.file.originFileObj) {
      const formData = new FormData();
      formData.append("file", info.file.originFileObj);
      const res = await uploadImg(formData, tplTree.selectedTemplateId);
      //console.log(res);
      if (res.success) {
        await common.aimvCanvasRef.handler.workareaHandler.setImage(res.url);
        await setCurrentImg(res.url);
      }
    }
  };
  componentDidMount = async () => {
    const { listImg, tplTree, setMainMenuId } = this.props;
    setMainMenuId(1);
    try {
      await listImg(tplTree.selectedTemplateId);
      const { imgUpload, setCurrentImg } = this.props;
      await setCurrentImg(imgUpload.fileList[0].url);
    } catch (err) {
      this.props.setHasError({ hasError: true, err });
    }
  };
  handleClick = async () => {
    const {
      dataExtract,
      setLoading,
      extractData,
      tplTree,
      common
    } = this.props;
    const cuid = dataExtract.currentImg.substring(
      dataExtract.currentImg.lastIndexOf("/") + 1
    );
    setLoading(true);
    const res = await extractData(
      cuid,
      tplTree.selectedTemplateId,
      dataExtract.nlpFlag
    );
    if (!res.success) {
      this.openNotificationWithIcon(
        "error",
        "Failed",
        "Oops, Something go wrong!"
      );
    } else {
      await common.aimvCanvasRef.handler.workareaHandler.setImage(
        `${dataExtract.currentImg}?box=1`,
        "boxedimg"
      );
      this.openNotificationWithIcon("success", "Done", "Data extracted!");
    }
    setLoading(false);
  };
  render() {
    const { imgUpload, dataExtract } = this.props;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="data-extraction animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="8" className="pr-2">
            <Card>
              <CardHeader>
                <strong> Scanned Doccument </strong>
                <Button
                  type="primary"
                  className="mr-3 ml-3 float-right"
                  loading={dataExtract.loading}
                  onClick={this.handleClick}
                >
                  Extract data
                </Button>
              </CardHeader>
              <AICRImageEditor></AICRImageEditor>
              <div className="clearfix mt-4 ml-3 pb-4">
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={imgUpload.fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                  onRemove={this.handleRemove}
                >
                  {imgUpload.fileList.length >= 8 ? null : uploadButton}
                </Upload>
              </div>
            </Card>
          </Col>
          <Col xs="12" sm="12" lg="4" className="pl-2">
            <Card className="extract-form">
              <CardHeader>
                <strong> Extracted Data </strong>
                <Button
                  type="primary"
                  style={{ backgroundColor: "green", borderColor: "green" }}
                  className="float-right"
                >
                  Export
                </Button>
              </CardHeader>
              <CardBody className="eform-scroll">
                <ExtractForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ imgUpload, dataExtract, common, tplTree }) => {
  return { imgUpload, dataExtract, common, tplTree };
};

export default connect(mapStateToProps, actions)(DataExtraction);
