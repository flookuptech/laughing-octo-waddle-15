import React, { Fragment } from "react";
import { Grid, TextareaAutosize } from "@material-ui/core";
import InputField from "components/form/inputField";

const UploadInvoiceDataFields = ({ onSubmit, onChange }) => {
  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <Grid container direction="row" spacing={2} justify="space-between">
          <Grid item lg={4} md={6} xs={12}>
            <InputField
              required
              name="tdsRate"
              onChange={onChange}
              placeholder="Enter rate of TDS"
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <InputField
              required
              name="remittanceCurrency"
              onChange={onChange}
              placeholder="Currency in which remittance is made"
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <InputField
              required
              name="remittanceNature"
              onChange={onChange}
              placeholder="Nature of remittance"
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <InputField
              required
              name="codePurpose"
              onChange={onChange}
              placeholder="Purpose of code"
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <InputField
              required
              name="paidTax"
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
            <TextareaAutosize
              rowsMin={5}
              name="remarks"
              onChange={onChange}
              placeholder="Type your remarks here, if any"
              style={{
                backgroundColor: "rgba(64, 101, 224, 0.1)",
                boxShadow: "inset 2px 2px 2px 0px #ddd",
                borderRadius: "3px",
                outline: "none",
                resize: "none",
                width: "100%",
                fontSize: "16px"
              }}
            />
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default UploadInvoiceDataFields;
