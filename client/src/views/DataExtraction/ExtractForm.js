import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { renderTextField, renderCheckBoxesField } from "./ExtractFields";

class ExtractForm extends Component {
  componentDidMount = async () => {
    await this.props.getExtractTemplate(this.props.common.selectedTemplate);
  };

  renderFields(formValues) {
    let rfields = [];
    if (
      !(this.props.common.extractTemplate === undefined) &&
      !(this.props.common.extractTemplate.template_config_fields === undefined)
    ) {
      this.props.common.extractTemplate.template_config_fields.map(field => {
        switch (field.data_type) {
          case "text":
            rfields.push(
              <div key={field.id}>
                {renderTextField(field.field_name, field.field_label)}
              </div>
            );
            break;
          case "checkboxes":
            //console.log(field.value);
            rfields.push(
              <div key={field.id}>
                {renderCheckBoxesField(
                  field.field_name,
                  field.field_label,
                  field.options,
                  formValues[field.field_name]
                )}
              </div>
            );
            break;
          case "group":
            if (field.group_type === "combine") {
              rfields.push(
                <div key={field.id}>
                  {renderTextField(field.field_name, field.field_label)}
                </div>
              );
            } else {
              for (let i = 0; i < field.sources.length; i++) {
                const source = field.sources[i];
                rfields.push(
                  <div key={source.id}>
                    {renderTextField(source.field_name, source.field_label)}
                  </div>
                );
              }
            }

            break;
          default:
        }
      });
    }
    return rfields;
  }
  render() {
    const { formValues } = this.props;
    //console.log(formValues);
    return (
      <form className="form-horizontal">{this.renderFields(formValues)}</form>
    );
  }
}

const mapStateToProps = state => {
  //console.log(this.state);
  if (state.form.eform && state.form.eform.values) {
    return { formValues: state.form.eform.values, common: state.common };
  } else {
    return { formValues: [], common: state.common };
  }
};

ExtractForm = reduxForm({ form: "eform" })(
  connect(mapStateToProps, actions)(ExtractForm)
);
export default ExtractForm;
