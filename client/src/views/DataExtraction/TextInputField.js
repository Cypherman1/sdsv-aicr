import React from "react";
import { Col, FormGroup, Label, Input } from "reactstrap";

export default ({ input }) => {
  console.log("OK");
  return (
    <FormGroup row>
      <Col xs="12" md="5">
        <Label htmlFor="name">Họ tên (Name)</Label>
      </Col>
      <Col xs="12" md="7">
        <Input {...input} />
      </Col>
    </FormGroup>
  );
};
