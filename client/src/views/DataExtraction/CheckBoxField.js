import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ input, meta, label, ischecked }) => {
  return (
    <FormGroup check className="checkbox">
      <Input
        {...input}
        className="form-check-input"
        type="checkbox"
        checked={ischecked}
      />
      <Label check className="form-check-label">
        {label}
      </Label>
    </FormGroup>
  );
};
