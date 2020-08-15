import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import InputField from "components/form/inputField";
import CustomTextArea from "components/form/textArea";

const UploadInvoiceDataFields = ({ onSubmit, onChange }) => {
  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <Grid container direction="row" spacing={2} justify="space-between">
          <Grid item lg={4} md={6} xs={12}>
            <InputField
              name="tdsRate"
              onChange={onChange}
              placeholder="Enter rate of TDS"
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <InputField
              name="remittanceCurrency"
              onChange={onChange}
              placeholder="Currency in which remittance is made"
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <InputField
              name="remittanceNature"
              onChange={onChange}
              placeholder="Nature of remittance"
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <InputField
              name="purposeCode"
              onChange={onChange}
              placeholder="Purpose of code"
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <InputField
              name="taxPaid"
              onChange={onChange}
              placeholder="Please confirm is tax paid is to be grossed up"
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <InputField
              required
              name="trc"
              onChange={onChange}
              placeholder="Is TRC available?"
            />
          </Grid>
          <Grid item lg={12} xs={12}>
            <CustomTextArea
              variant="pending"
              onChange={onChange}
              name="clientRemarks"
              rows={3}
              placeholder="Type your remarks here, if any"
            />
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default UploadInvoiceDataFields;
