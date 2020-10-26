import React, { Fragment } from "react";
import { DropzoneDialog } from "material-ui-dropzone";

const DropzoneDialogExample = ({
  handleSave,
  handleClose,
  open,
  filesLimit,
  acceptedFiles,
}) => {
  return (
    <Fragment>
      <DropzoneDialog
        open={open}
        onSave={handleSave}
        acceptedFiles={[acceptedFiles]}
        showPreviews={true}
        maxFileSize={5000000}
        filesLimit={filesLimit}
        showFileNames={true}
        onClose={handleClose}
        submitButtonText="Save"
        useChipsForPreview={true}
      />
    </Fragment>
  );
};

export default DropzoneDialogExample;
