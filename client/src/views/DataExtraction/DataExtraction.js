import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { Upload, Icon, notification, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "../../assets/css/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";

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
    this.props.resetForm();
    editorInstance.loadImageFromURL(file.url || file.preview, "testImage");
    this.props.setCurrentImg(file.url || file.preview);
  };

  handleRemove = async info => {
    await this.props.delImg(info.uid);
    await this.props.listImg();
  };
  handleChange = info => {
    if (info.file.originFileObj) {
      const formData = new FormData();
      formData.append("file", info.file.originFileObj);
      this.props.uploadImg(formData);
    }
  };
  componentDidMount = async () => {
    try {
      await this.props.listImg();
      //const editorInstance = this.editorRef.current.getInstance();

      // await this.props.setCurrentImg(this.props.imgUpload.fileList[0].url);
      // console.log(this.props.imgUpload.fileList[0].url);

      // await editorInstance.loadImageFromURL(
      //   this.props.imgUpload.fileList[0].url,
      //   "testImage"
      // );
    } catch (ex) {
      console.log(ex);
    }
  };

  handleClick = async () => {
    try {
      const cuid = this.props.dataExtract.currentImg.substring(
        this.props.dataExtract.currentImg.lastIndexOf("/") + 1
      );
      this.props.setLoading(true);
      //console.log(this.props);
      const res = await this.props
        .extractData(cuid, this.props.dataExtract.nlpFlag)
        .catch(e => this.error());
      if (res.status) {
        this.openNotificationWithIcon(
          "error",
          "Failed",
          "Oops, Something go wrong!"
        );
      } else {
        this.openNotificationWithIcon("success", "Done", "Data extracted!");
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  handleChangeName = e => {
    this.props.setName(e.target.value);
  };
  handleChangeBirthday = e => {
    this.props.setName(e.target.birthday);
  };
  handleChangeNation = e => {
    this.props.setName(e.target.nation);
  };
  handleChangeNohome1 = e => {
    this.props.setName(e.target.nohome1);
  };
  handleChangeStreethome1 = e => {
    this.props.setName(e.target.streethome1);
  };
  handleChangeWardhome1 = e => {
    this.props.setName(e.target.wardhome1);
  };
  handleChangeDistricthome1 = e => {
    this.props.setName(e.target.districthome1);
  };
  handleChangeCityhome1 = e => {
    this.props.setName(e.target.cityhome1);
  };
  handleChangePhonenumber = e => {
    this.props.setName(e.target.phonenumber);
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
                <Button type="primary" className="mr-3 ml-3 float-right">
                  Save change
                </Button>
              </CardHeader>
              <CardBody>
                <form className="form-horizontal">
                  <FormGroup row>
                    <Col md="5">
                      <Label htmlFor="name">Họ tên (Name)</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input
                        type="text"
                        id="name"
                        placeholder=""
                        value={dataExtract.name}
                        onChange={e => this.handleChangeName}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="5">
                      <Label htmlFor="birthday">Ngày sinh (DoB)</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input
                        type="text"
                        id="birthday"
                        placeholder=""
                        value={dataExtract.birthday}
                        onChange={e => this.handleChangeBirthday}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="5">
                      <Label htmlFor="nation">Quốc tịch (Nationality)</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input
                        type="text"
                        id="nation"
                        placeholder=""
                        value={dataExtract.nation}
                        onChange={e => this.handleChangeNation}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="5">
                      <Label htmlFor="nohome1">Số nhà (Home No)</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input
                        type="text"
                        id="nohome1"
                        placeholder=""
                        value={dataExtract.nohome1}
                        onChange={e => this.handleChangeNohome1}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="5">
                      <Label htmlFor="streethome1">Đường (Street)</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input
                        type="text"
                        id="streethome1"
                        placeholder=""
                        value={dataExtract.streethome1}
                        onChange={e => this.handleChangeStreethome1}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="5">
                      <Label htmlFor="wardhome1">Phường, xã (Ward)</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input
                        type="text"
                        id="wardhome1"
                        placeholder=""
                        value={dataExtract.wardhome1}
                        onChange={e => this.handleChangeWardhome1}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="5">
                      <Label htmlFor="districthome1">
                        Quận/Huyện (District)
                      </Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input
                        type="text"
                        id="districthome1"
                        placeholder=""
                        value={dataExtract.districthome1}
                        onChange={e => this.handleChangeDistricthome1}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="5">
                      <Label htmlFor="cityhome1">Tỉnh/Thành phố (City)</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input
                        type="text"
                        id="cityhome1"
                        placeholder=""
                        value={dataExtract.cityhome1}
                        onChange={e => this.handleChangeCityhome1}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="5">
                      <Label htmlFor="phonenumber">Di động (Phone)</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input
                        type="text"
                        id="phonenumber"
                        placeholder=""
                        value={dataExtract.phonenumber}
                        onChange={e => this.handleChangePhonenumber}
                      />
                    </Col>
                  </FormGroup>
                </form>
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
