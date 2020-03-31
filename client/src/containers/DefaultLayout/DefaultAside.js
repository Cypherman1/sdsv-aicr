import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  FormGroup
} from "reactstrap";
import classNames from "classnames";
import { AppSwitch } from "@coreui/react";
import { connect } from "react-redux";
import { Input } from "antd";
import * as actions from "../../actions";
import TemplateTree from "../../views/TemplateTree/TemplateTree";

const { Search } = Input;

class DefaultAside extends Component {
  //classes = useStyles();
  componentDidMount() {
    this.props.loadTplTree();
  }
  // onSelect = async (keys, e) => {
  //   this.props.setSelectedTemplate(keys[0]);
  //   if (e.selectedNodes[0].props.isLeaf) {
  //     await this.props.getExtractTemplate(keys[0]);
  //   }
  //   await this.props.resetForm();
  //   await this.props.listImg(this.props.common.selectedTemplate);
  //   await this.props.common.editorInstance.loadImageFromURL(
  //     this.props.imgUpload.fileList.length === 0
  //       ? "./assets/img/no-image.png"
  //       : this.props.imgUpload.fileList[0].url,
  //     "noimg"
  //   );
  // };
  onLeave = () => {
    this.props.toggleAsideApp();
  };

  render() {
    // eslint-disable-next-line
    const { dataExtract, setNLPFlag, common, setActiveAsideTab } = this.props;

    return (
      <div onMouseLeave={this.onLeave}>
        <React.Fragment>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classNames({
                  active: common.activeAsideTab === "1"
                })}
                onClick={() => {
                  setActiveAsideTab("1");
                }}
              >
                <i className="icon-list"></i>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={classNames({
                  active: common.activeAsideTab === "2"
                })}
                onClick={() => {
                  setActiveAsideTab("2");
                }}
              >
                <i className="icon-settings"></i>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={common.activeAsideTab}>
            <TabPane tabId="1" className="p-3 m-3">
              <FormGroup>
                <Search
                  style={{ marginBottom: 8 }}
                  placeholder="Search template"
                />

                {<TemplateTree />}
              </FormGroup>
            </TabPane>
            <TabPane tabId="2" className="p-3">
              <h6>Settings</h6>
              <div className="aside-options">
                <div className="clearfix mt-4">
                  <small>
                    <b>NLP Spell checker</b>
                  </small>
                  <AppSwitch
                    className={"float-right"}
                    variant={"pill"}
                    label
                    color={"success"}
                    size={"sm"}
                    checked={dataExtract.nlpFlag === 1 ? true : false}
                    onChange={() =>
                      setNLPFlag(dataExtract.nlpFlag === 1 ? 0 : 1)
                    }
                  />
                </div>
                <div>
                  <small className="text-muted">
                    Enable NLP for name and address spell checking
                  </small>
                </div>
              </div>
            </TabPane>
          </TabContent>
        </React.Fragment>
      </div>
    );
  }
}

// DefaultAside.propTypes = propTypes;
// DefaultAside.defaultProps = defaultProps;

const mapStateToProps = ({ dataExtract, common, imgUpload, tplTree }) => {
  return { dataExtract, common, imgUpload, tplTree };
};

export default connect(mapStateToProps, actions)(DefaultAside);
