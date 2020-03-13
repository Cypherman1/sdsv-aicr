import React from "react";
import { Col, FormGroup, Label, Input } from "reactstrap";

export default ({ input, meta, label }) => {
  return (
    <FormGroup row>
      <Col xs="12" md="5">
        <Label> {label}</Label>
      </Col>
      <Col xs="12" md="7">
        <Input {...input} />
      </Col>
    </FormGroup>
  );
};
