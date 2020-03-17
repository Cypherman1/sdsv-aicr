import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { Upload, Icon, notification, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "../../assets/css/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
//import { IMEOptions } from "./IMEConf";
import ExtractForm from "./ExtractForm";
import ErrorBoundary from "../../containers/ErrorBoundary";

notification.config({
  placement: "bottomRight",
  bottom: 0,
  duration: 2
});

const myTheme = {
  "common.bi.image":
    "https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png",
  "common.bisize.width": "251px",
  "common.bisize.height": "21px",
  "common.backgroundImage": "./img/bg.png",
  "common.backgroundColor": "#fff",
  "common.border": "1px solid #c1c1c1",

  // header
  "header.backgroundImage": "none",
  "header.backgroundColor": "transparent",
  "header.border": "0px",

  // load button
  "loadButton.backgroundColor": "#fff",
  "loadButton.border": "1px solid #ddd",
  "loadButton.color": "#222",
  "loadButton.fontFamily": "'Noto Sans', sans-serif",
  "loadButton.fontSize": "12px",

  // download button
  "downloadButton.backgroundColor": "#fdba3b",
  "downloadButton.border": "1px solid #fdba3b",
  "downloadButton.color": "#fff",
  "downloadButton.fontFamily": "'Noto Sans', sans-serif",
  "downloadButton.fontSize": "12px",

  // main icons
  "menu.normalIcon.path": "assets/img/svg/icon-d.svg",
  "menu.normalIcon.name": "icon-d",
  "menu.activeIcon.path": "assets/img/svg/icon-b.svg",
  "menu.activeIcon.name": "icon-b",
  "menu.disabledIcon.path": "assets/img/svg/icon-a.svg",
  "menu.disabledIcon.name": "icon-a",
  "menu.hoverIcon.path": "assets/img/svg/icon-c.svg",
  "menu.hoverIcon.name": "icon-c",
  "menu.iconSize.width": "24px",
  "menu.iconSize.height": "24px",

  // submenu primary color
  "submenu.backgroundColor": "#1e1e1e",
  "submenu.partition.color": "red",

  // submenu icons
  "submenu.normalIcon.path": "assets/img/svg/icon-a.svg",
  "submenu.normalIcon.name": "icon-a",
  "submenu.activeIcon.path": "assets/img/svg/icon-c.svg",
  "submenu.activeIcon.name": "icon-c",
  "submenu.iconSize.width": "32px",
  "submenu.iconSize.height": "32px",

  // submenu labels
  "submenu.normalLabel.color": "#858585",
  "submenu.normalLabel.fontWeight": "normal",
  "submenu.activeLabel.color": "#000",
  "submenu.activeLabel.fontWeight": "normal",

  // checkbox style
  "checkbox.border": "1px solid #ccc",
  "checkbox.backgroundColor": "#fff",

  // rango style
  "range.pointer.color": "#333",
  "range.bar.color": "#ccc",
  "range.subbar.color": "#606060",

  "range.disabledPointer.color": "#d3d3d3",
  "range.disabledBar.color": "rgba(85,85,85,0.06)",
  "range.disabledSubbar.color": "rgba(51,51,51,0.2)",

  "range.value.color": "#000",
  "range.value.fontWeight": "normal",
  "range.value.fontSize": "11px",
  "range.value.border": "0",
  "range.value.backgroundColor": "#f5f5f5",
  "range.title.color": "#000",
  "range.title.fontWeight": "lighter",

  // colorpicker style
  "colorpicker.button.border": "0px",
  "colorpicker.title.color": "#000"
};

class DataExtraction extends Component {
  editorRef = React.createRef();
  imageEditorOptions = {
    includeUI: {
      loadImage: {
        path: this.props.dataExtract.currentImg,
        name: "sampleImage2"
      },
      uiSize: {
        // height: "530px"
      },
      theme: myTheme,
      menu: ["shape", "filter"],
      menuBarPosition: "left"
    },
    //cssMaxWidth: 200
    cssMaxHeight: 1000
  };
  openNotificationWithIcon = (type, title, description) => {
    notification[type]({
      message: title,
      description: description
    });
  };
  handlePreview = async file => {
    const editorInstance = this.editorRef.current.getInstance();
    const { resetForm, setCurrentImg } = this.props;
    resetForm();
    await editorInstance.loadImageFromURL(
      file.url || file.preview,
      "testImage"
    );
    await setCurrentImg(file.url || file.preview);
  };
  handleRemove = async info => {
    const { delImg, listImg } = this.props;
    await delImg(info.uid);
    await listImg();
  };
  handleChange = info => {
    const { uploadImg } = this.props;
    if (info.file.originFileObj) {
      console.log(info.file.originFileObj);
      const formData = new FormData();
      formData.append("file", info.file.originFileObj);
      uploadImg(formData);
    }
  };
  componentDidMount = async () => {
    try {
      const editorInstance = this.editorRef.current.getInstance();

      await this.props.listImg();
      const { imgUpload, setCurrentImg } = this.props;
      await setCurrentImg(imgUpload.fileList[0].url);
    } catch (err) {
      this.props.setHasError({ hasError: true, err });
    }
  };
  handleClick = async () => {
    const { dataExtract, setLoading, extractData } = this.props;
    const cuid = dataExtract.currentImg.substring(
      dataExtract.currentImg.lastIndexOf("/") + 1
    );
    setLoading(true);
    const res = await extractData(cuid, dataExtract.nlpFlag);
    if (!res.success) {
      this.openNotificationWithIcon(
        "error",
        "Failed",
        "Oops, Something go wrong!"
      );
    } else {
      this.openNotificationWithIcon("success", "Done", "Data extracted!");
    }
    setLoading(false);
  };

  render() {
    const { imgUpload, dataExtract } = this.props;

    const uploadButton = (
      <div>
        <Icon type="plus" />
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
              <ImageEditor
                ref={this.editorRef}
                {...this.imageEditorOptions}
              ></ImageEditor>
              <div className="clearfix mt-4 ml-3">
                <Upload
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

const mapStateToProps = ({ imgUpload, dataExtract }) => {
  return { imgUpload, dataExtract };
};

export default connect(mapStateToProps, actions)(DataExtraction);
