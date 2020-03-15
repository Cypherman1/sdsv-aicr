import React from "react";
import { Col, FormGroup, Label, Input } from "reactstrap";

export default ({ input, meta, label }) => {
  return (
    <FormGroup>
      <Label> {label}</Label>
      <Input {...input} />
    </FormGroup>
  );
};
