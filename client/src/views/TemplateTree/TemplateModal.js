import React from "react";
import { Modal, Button } from "antd";
import { connect } from "react-redux";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions";

// const handleOk = async (e, setTplModalVisible, addNewTemplate, selected) => {
//   const res = await addNewTemplate(selected, "test", false);
//   setTplModalVisible(false);
// };

const validate = values => {
  const errors = {};
  //console.log(`values ${values}`);
  if (!values.tname) {
    errors.tname = "Name can not be blank!";
  }
  return errors;
};

const renderInput = ({ input, meta, label }) => (
  <FormGroup>
    <Label>{label}</Label>
    <Input {...input} invalid={meta.invalid && meta.touched} />
    <FormFeedback className="help-block">{meta.error}</FormFeedback>
  </FormGroup>
);

const TemplateModal = ({
  tplTree,
  setTplModalVisible,
  addNewTemplate,
  setUpdating,
  resetTForm,
  removeTemplateFolder,
  values,
  errors
}) => {
  const handleOk = async () => {
    //console.log(values);
    let res;
    setUpdating(true);

    switch (tplTree.modalAction) {
      case "New Template":
        res = await addNewTemplate(tplTree.selected, values.tname, true);
        setUpdating(false);
        resetTForm();
        setTplModalVisible(false);
        return;
      case "New Folder":
        res = await addNewTemplate(tplTree.selected, values.tname, false);
        setUpdating(false);
        resetTForm();
        setTplModalVisible(false);
        return;
      case "Delete Confirmation":
        res = await removeTemplateFolder(tplTree.selected);
        setUpdating(false);
        setTplModalVisible(false);
      default:
        setUpdating(false);
        setTplModalVisible(false);
        return;
    }
  };

  const handleCancel = () => {
    setTplModalVisible(false);
  };

  return (
    <div>
      <Modal
        title={tplTree.modalAction}
        visible={tplTree.tmlVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {`${
              tplTree.modalAction === "Delete Confirmation" ? "No" : "Cancel"
            }`}
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={
              !(errors === null) &&
              !(tplTree.modalAction === "Delete Confirmation")
            }
            loading={tplTree.loading}
            onClick={handleOk}
          >
            {`${
              tplTree.modalAction === "Delete Confirmation" ? "Yes" : "Submit"
            }`}
          </Button>
        ]}
      >
        {tplTree.modalAction === "Delete Confirmation" ? (
          <div>
            Are you sure to delete the
            <strong>
              {` ${tplTree.selectedLabel}  ${
                tplTree.isTemplate ? "Template ?" : "Folder ?"
              }`}
            </strong>
          </div>
        ) : (
          <form>
            <Field name="tname" label="Name" component={renderInput} />
          </form>
        )}
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  //console.log(this.state);
  let verrors = null;
  if (state.form.tmodal && state.form.tmodal.syncErrors) {
    verrors = state.form.tmodal.syncErrors;
  }

  if (state.form.tmodal && state.form.tmodal.values) {
    return {
      errors: verrors,
      values: state.form.tmodal.values,
      tplTree: state.tplTree
    };
  } else {
    return { errors: verrors, values: [], tplTree: state.tplTree };
  }
};

export default reduxForm({ form: "tmodal", validate })(
  connect(mapStateToProps, actions)(TemplateModal)
);
