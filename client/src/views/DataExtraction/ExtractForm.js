import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Col, FormGroup, Label, Input } from "reactstrap";
import fields from "./Fields.json";
import TextInputField from "./TextInputField";
class ExtractForm extends Component {
  renderTextInput = () => {
    return <Field name="name" component="input" />;
  };
  renderFields() {
    let rfields = [];
    fields.template_config_fields.map(field => {
      switch (field.field_type) {
        case "text-input":
          rfields.push(
            <div key={field.field_name}> {this.renderTextInput()} </div>
          );
          break;
        default:
      }
    });
    console.log(rfields);
    return rfields;
  }
  render() {
    return <form className="form-horizontal">{this.renderFields()}</form>;
  }
}

ExtractForm = reduxForm({ form: "eform" })(ExtractForm);
export default ExtractForm;
