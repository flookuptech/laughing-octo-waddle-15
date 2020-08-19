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
  handleClose,
  loading,
}) => {
  return (
    <Fragment>
      {console.log(data)}
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
                  item.value === "partyName" || item.value === "trackingNumber"
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
      <br />
      <Divider style={{ padding: 1 }} />
      <br />
      <Typography className="pageHeading" component="h6" variant="h6">
        Add your inputs and remarks:
      </Typography>
      <br />
      <Fragment>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {editableFields.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <InputField
                    required
                    helperText={item.helperText}
                    InputProps={{ readOnly: false }}
                    name={item.value}
                    onChange={handleOnChange}
                  />
                </Grid>
              );
            })}
          </Grid>
          <br />
          <CustomTextArea
            variant="pending"
            onChange={handleOnChange}
            name="adminRemarks"
            rows={3}
            placeholder="Type your remarks here, if any"
          />
          <br />
          <br />
          <CustomButton
            variant="outlined"
            color="secondary"
            icon={<Publish />}
            onClick={handleOpen}
            label="15CB"
          />
          <br />
          <br />
          <FileUpload
            open={open}
            handleSave={handleSave}
            handleClose={handleClose}
            filesLimit={1}
          />
          <div style={{ float: "right" }}>
            <CustomButton
              variant="contained"
              loading={loading}
              color="primary"
              icon={<Send />}
              label="Submit"
              type="submit"
            />
          </div>
        </form>
      </Fragment>
    </Fragment>
  );
};

export default TransactionDataFields;
