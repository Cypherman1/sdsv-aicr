import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Col, FormGroup, Label } from "reactstrap";
import { connect } from "react-redux";
import fields from "./Fields.json";
import TextInputField from "./TextInputField";
import CheckBoxField from "./CheckBoxField";

const renderCheckBoxes = ({ custom }) => {
  return (
    <div>
      {custom.checkboxes.map(checkbox => (
        <Field
          key={checkbox.id}
          name={`${custom.name}.${checkbox.name}`}
          props={{ type: "text" }}
          component={CheckBoxField}
          {...{ label: checkbox.label, ischecked: custom.checked }}
        />
      ))}
    </div>
  );
};

class ExtractForm extends Component {
  renderTextInputField = (name, label) => {
    return (
      <Field
        name={name}
        props={{ type: "text" }}
        component={TextInputField}
        {...{ label }}
      />
    );
  };

  renderCheckBoxesField = (name, label, custom) => {
    return (
      <FormGroup row>
        <Col xs="12" md="5">
          <Label> {label}</Label>
        </Col>
        <Col xs="12" md="7">
          <Field name={name} component={renderCheckBoxes} {...{ custom }} />
        </Col>
      </FormGroup>
    );
  };

  renderFields(formValues) {
    let rfields = [];
    fields.template_config_fields.map(field => {
      switch (field.field_type) {
        case "text-input":
          rfields.push(
            <div key={field.id}>
              {this.renderTextInputField(field.field_name, field.field_label)}
            </div>
          );
          break;
        case "checkboxes":
          rfields.push(
            <div key={field.id}>
              {this.renderCheckBoxesField(field.field_name, field.field_label, {
                name: field.field_name,
                checkboxes: field.value,
                checked: formValues[field.field_name]
              })}
            </div>
          );
          break;
        default:
      }
    });
    return rfields;
  }
  render() {
    const { formValues } = this.props;
    console.log(formValues);
    return (
      <form className="form-horizontal">{this.renderFields(formValues)}</form>
    );
  }
}

const mapStateToProps = state => {
  //console.log(this.state);
  if (state.form.eform && state.form.eform.values) {
    return { formValues: state.form.eform.values };
  } else {
    return { formValues: [] };
  }
};

ExtractForm = reduxForm({ form: "eform" })(
  connect(mapStateToProps)(ExtractForm)
);
export default ExtractForm;
