import React, { Component, Fragment } from "react";
import CustomButton from "components/form/button";
import { DropzoneDialog } from "material-ui-dropzone";

const DropzoneDialogExample = ({
  handleOpen,
  handleSave,
  handleClose,
  open
}) => {
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
};

export default DropzoneDialogExample;
