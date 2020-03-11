import React, { Component } from "react";
import { reduxForm } from "redux-form";
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
import { IMEOptions } from "./IMEConf";
import ExtractForm from "./ExtractForm";

notification.config({
  placement: "bottomRight",
  bottom: 0,
  duration: 2
});

class DataExtraction extends Component {
  editorRef = React.createRef();
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
    editorInstance.loadImageFromURL(file.url || file.preview, "testImage");
    setCurrentImg(file.url || file.preview);
  };
  handleRemove = async info => {
    const { delImg, listImg } = this.props;
    await delImg(info.uid);
    await listImg();
  };
  handleChange = info => {
    const { uploadImg } = this.props;
    if (info.file.originFileObj) {
      const formData = new FormData();
      formData.append("file", info.file.originFileObj);
      uploadImg(formData);
    }
  };
  componentDidMount = async () => {
    const { imgUpload, setCurrentImg, listImg } = this.props;
    const editorInstance = this.editorRef.current.getInstance();
    await listImg();
    await setCurrentImg(imgUpload.fileList[0].url);
    await editorInstance.loadImageFromURL(
      imgUpload.fileList[0].url,
      imgUpload.fileList
    );
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
              <ImageEditor ref={this.editorRef} {...IMEOptions}></ImageEditor>
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
