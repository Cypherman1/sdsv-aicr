import React from "react";
import { Col, FormGroup, Label, Input } from "reactstrap";
import { Field } from "redux-form";

export const TextInputField = ({ input, meta, label }) => (
  <FormGroup>
    <Label> {label}</Label>
    <Input {...input} />
  </FormGroup>
);

export const renderCheckBox = ({ input, meta, label, ischecked }) => (
  <FormGroup check className="checkbox">
    <Input
      {...input}
      className="form-check-input"
      type="checkbox"
      checked={ischecked === undefined ? false : ischecked}
    />
    <Label check className="form-check-label">
      {label}
    </Label>
  </FormGroup>
);

export const renderCheckBoxField = (name, label, ischecked) => (
  <Field
    name={name}
    label={label}
    component={renderCheckBox}
    ischecked={ischecked}
  />
);

export const renderCheckBoxesField = (
  name,
  label,
  checkboxes,
  ischeckedarr
) => (
  <FormGroup row>
    <Col xs="12" md="5">
      <Label> {label}</Label>
    </Col>
    <Col xs="12" md="7">
      {checkboxes.map(checkbox => {
        return (
          <div key={checkbox.id}>
            {renderCheckBoxField(
              `${name}.${checkbox.name}`,
              checkbox.label,
              ischeckedarr === undefined ? false : ischeckedarr[checkbox.name]
            )}
          </div>
        );
      })}
    </Col>
  </FormGroup>
);

export const renderTextField = (name, label) => (
  <Field
    name={name}
    props={{ type: "text" }}
    component={TextInputField}
    {...{ label }}
  />
);
