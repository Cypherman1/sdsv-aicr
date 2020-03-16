import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  FormGroup,
  Label
} from "reactstrap";
import classNames from "classnames";
import { AppSwitch } from "@coreui/react";
import { connect } from "react-redux";
import { Tree, Input } from "antd";
import * as actions from "../../actions";

const { DirectoryTree } = Tree;
const { Search } = Input;

const treeData = [
  {
    title: "General Template",
    key: "F01",
    children: [
      {
        title: "ID Card",
        key: "2",
        isLeaf: true
      },
      {
        title: "Land Ownership Certification",
        key: "3",
        isLeaf: true
      }
    ]
  },
  {
    title: "Banking template",
    key: "F02",
    children: [
      {
        title: "Credit Card Application Form",
        key: "1",
        isLeaf: true
      },
      {
        title: "Home Loan Application Form",
        key: "4",
        isLeaf: true
      },
      {
        title: "Car Loan",
        key: "5",
        isLeaf: true
      }
    ]
  }
];

class DefaultAside extends Component {
  onSelect = (keys, e) => {
    this.props.setSelectedTemplate(keys[0]);
    if (e.selectedNodes[0].props.isLeaf) {
      this.props.getExtractTemplate(keys[0]);
    }
  };
  render() {
    // eslint-disable-next-line
    const { dataExtract, setNLPFlag, common, setActiveAsideTab } = this.props;

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: common.activeAsideTab === "1" })}
              onClick={() => {
                setActiveAsideTab("1");
              }}
            >
              <i className="icon-list"></i>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classNames({ active: common.activeAsideTab === "2" })}
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
                //onChange={this.onChange}
              />

              <DirectoryTree
                defaultExpandAll
                selectedKeys={[common.selectedTemplate]}
                onSelect={this.onSelect}
                treeData={treeData}
              />
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
                  onChange={() => setNLPFlag(dataExtract.nlpFlag === 1 ? 0 : 1)}
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
    );
  }
}

// DefaultAside.propTypes = propTypes;
// DefaultAside.defaultProps = defaultProps;

const mapStateToProps = ({ dataExtract, common }) => {
  return { dataExtract, common };
};

export default connect(mapStateToProps, actions)(DefaultAside);
