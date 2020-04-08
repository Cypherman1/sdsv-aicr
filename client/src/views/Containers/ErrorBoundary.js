import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Page500 from "../CommonPages/Page500/Page500";

class ErrorBoundary extends Component {
  componentDidCatch(error, info) {
    this.props.setHasError(true);
  }
  render() {
    if (this.props.common.hasError) {
      console.log(this.props.common.error);
      return <Page500 />;
    }
    return this.props.children;
  }
}

const mapStateToProps = ({ common }) => {
  return { common };
};

export default connect(mapStateToProps, actions)(ErrorBoundary);
