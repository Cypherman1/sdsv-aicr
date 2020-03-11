import React, { Component } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classNames from "classnames";
import { AppSwitch } from "@coreui/react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class DefaultAside extends Component {
  state = {
    activeTab: "1"
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    // eslint-disable-next-line
    const { dataExtract, setNLPFlag } = this.props;

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              <i className="icon-settings"></i>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1" className="p-3">
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

const mapStateToProps = ({ dataExtract }) => {
  return { dataExtract };
};

export default connect(mapStateToProps, actions)(DefaultAside);
