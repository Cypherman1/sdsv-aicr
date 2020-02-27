import React, { Component, lazy, Suspense } from "react";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table
} from "reactstrap";

import { Upload, Icon, Modal } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "../../assets/css/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
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
  state = {
    previewVisible: false,
    previewImage: "assets/img/uploads/0001.jpg",
    fileList: [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "assets/img/uploads/0001.jpg"
      },
      {
        uid: "-2",
        name: "image.png",
        status: "done",
        url: "assets/img/uploads/0002.jpg"
      },
      {
        uid: "-3",
        name: "image.png",
        status: "done",
        url: "assets/img/uploads/0004.jpg"
      },
      {
        uid: "-4",
        name: "image.png",
        status: "done",
        url: "assets/img/uploads/0005.jpg"
      }
    ]
  };

  imageEditorOptions = {
    includeUI: {
      loadImage: {
        path: this.state.previewImage,
        name: "sampleImage2"
      },
      uiSize: {
        height: "530px"
      },
      theme: myTheme
    }
    //cssMaxWidth: 700,
    //cssMaxHeight: 800
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    const editorInstance = this.editorRef.current.getInstance();
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    editorInstance.loadImageFromURL(file.url || file.preview, "testImage");

    console.log(file.url);
    console.log(file.preview);

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = info => {
    const formData = new FormData();
    formData.append("myImage", info.file.originFileObj);
    this.props.uploadImg(formData);
    // axios.post("http://localhost:5000/upload", formData, {}).then(res => {
    //   this.setState({
    //     fileList: [
    //       ...this.state.fileList,
    //       {
    //         uid: "-5",
    //         name: "image.png",
    //         status: "done",
    //         url: "assets/img/uploads/0006.jpg"
    //       }
    //     ]
    //   });

    //  console.log(res);
    //});
    //this.setState(info.fileList);
  };
  componentDidMount() {
    this.props.listImg();
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { imgUpload, uploadImg } = this.props;
    console.log(imgUpload.fileList);

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="9" className="pr-2">
            <ImageEditor ref={this.editorRef} {...this.imageEditorOptions} />
            <input type="file" name="file" onChange={this.onChangeHandler} />
            <div className="clearfix mt-2">
              <Upload
                //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={imgUpload.fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </div>
          </Col>
          <Col xs="12" sm="12" lg="3" className="pl-2">
            <Card>
              <CardHeader>Extracted Data</CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ imgUpload }) => {
  return { imgUpload };
};

export default connect(mapStateToProps, actions)(DataExtraction);
