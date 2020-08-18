import React from "react";
import { Fragment } from "react";
import { Typography, Grid, Divider } from "@material-ui/core";
import InputField from "components/form/inputField";
import { readOnlyFields, editableFields } from "../15cbDetailsFields";
import CustomTextArea from "components/form/textArea";
import CustomButton from "components/form/button";
import FileUpload from "components/fileUpload";
import { Publish, Send } from "@material-ui/icons";

const TransactionDataFields = ({
  data,
  handleSubmit,
  handleOnChange,
  handleOpen,
  handleSave,
  open,
  loading15cb,
}) => {
  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <InputField
            value={
              data.userId.userDetails.firstName +
              " " +
              data.userId.userDetails.lastName
            }
            helperText={"Client Name"}
            InputProps={{ readOnly: true }}
            name={"clientName"}
          />
        </Grid>
        {readOnlyFields.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <InputField
                value={
                  item.value === "trackingNumber"
                    ? data[item.value]
                    : item.value === "createdAt"
                    ? data[item.value].split("T")[0]
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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {editableFields.map((item) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <InputField
                  className="editable-field-background"
                  value={data[item.value]}
                  onChange={handleOnChange}
                  name={item.value}
                  helperText={item.helperText}
                  InputProps={{ readOnly: false }}
                />
              </Grid>
            );
          })}
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CustomTextArea
              value={data.adminRemarks === null ? "none" : data.adminRemarks}
              variant="completed"
              name="adminRemarks"
              placeholder="Type your remarks here, if any"
              rows={3}
              onChange={handleOnChange}
            />
          </Grid>
        </Grid>
        <br />
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <CustomButton
              variant="outlined"
              color="secondary"
              icon={<Publish />}
              label="15CB"
              onClick={handleOpen}
            />
            <FileUpload
              filesLimit={1}
              handleOpen={handleOpen}
              handleSave={handleSave}
              open={open}
            />
          </Grid>
          <br />
          <Grid item>
            <CustomButton
              variant="contained"
              color="primary"
              icon={<Send />}
              label="Update 15CB Details"
              type="submit"
              loading={loading15cb}
            />
          </Grid>
        </Grid>
      </form>
      <br />
      {/* <br />
      {/* <Divider />
      <br />
      <Fragment>
        <Typography className="pageHeading" component="h6" variant="h6">
          Upload XML
        </Typography>
      </Fragment>
      <br />
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <CustomButton
              variant="outlined"
              color="secondary"
              icon={<Publish />}
              label="XML"
              onClick={handleOpen}
            />
            <FileUpload
              name="xml"
              filesLimit={1}
              handleOpen={handleOpen}
              handleSave={handleSave}
              open={open}
            />
          </Grid>
          <Grid item>
            <CustomButton
              variant="contained"
              color="primary"
              icon={<Send />}
              label="XML"
              type="submit"
            />
          </Grid>
        </Grid>
      </form> */}
    </Fragment>
  );
};

export default TransactionDataFields;
