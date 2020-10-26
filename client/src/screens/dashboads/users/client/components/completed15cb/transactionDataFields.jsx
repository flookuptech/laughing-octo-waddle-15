import React from "react";
import { Fragment } from "react";
import { Typography, Grid, Divider } from "@material-ui/core";
import InputField from "components/form/inputField";
import { transactionDetailsDataFields } from "./15cbDetailsDataFields";
import CustomButton from "components/form/button";
import FileUpload from "components/fileUpload";
import { Publish, Send } from "@material-ui/icons";

const TransactionDataFields = ({
  data,
  handleSubmit,
  handleOpen,
  handleSave,
  handleClose,
  loading,
}) => {
  return (
    <Fragment>
      <Grid container spacing={3}>
        {transactionDetailsDataFields.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputField
                value={
                  item.value === "adminRemarks" ||
                  item.value === "ackNumber" ||
                  item.value === "udin" ||
                  item.value === "partyName"
                    ? data[item.value]
                    : item.value === "createdAt"
                    ? data[item.value].split("T")[0]
                    : data.userRemarks[item.value] === "undefined"
                    ? "Not provided"
                    : data.userRemarks[item.value]
                }
                helperText={item.helperText}
                InputProps={{ readOnly: true }}
                name={item.value}
              />
            </Grid>
          );
        })}
      </Grid>
      <br />
      {!data.caLink ? (
        <Fragment>
          <Divider style={{ padding: 1 }} />
          <br />
          <Typography className="pageHeading" component="h6" variant="h6">
            Upload 15CA
          </Typography>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid
              container
              justify="space-around"
              alignItems="center"
              direction="row"
            >
              <Grid item>
                <CustomButton
                  variant="outlined"
                  color="secondary"
                  onClick={handleOpen}
                  icon={<Publish />}
                  label="15CA"
                />
                <FileUpload
                  open={data.open}
                  handleSave={handleSave}
                  handleClose={handleClose}
                  filesLimit={1}
                  acceptedFiles="application/pdf"
                />
              </Grid>
              <Grid item>
                <CustomButton
                  variant="contained"
                  loading={loading}
                  color="primary"
                  icon={<Send />}
                  label="15CA"
                  type="submit"
                />
              </Grid>
            </Grid>
          </form>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default TransactionDataFields;
