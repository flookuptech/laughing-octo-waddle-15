import React, { Component, Fragment } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
// import Button from "@material-ui/core/Button";
import CustomButton from "components/form/button";

export default class DropzoneDialogExample extends Component {
  render() {
    const { handleOpen, handleSave, handleClose, open } = this.props;
    return (
      <Fragment>
        <CustomButton name="Upload file" onClick={handleOpen} />
        <DropzoneDialog
          open={open}
          onSave={handleSave}
          acceptedFiles={["image/*", "application/*"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={handleClose}
          useChipsForPreview={true}
        />
      </Fragment>
    );
  }
}
