import React, { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import HtmlTitle from "components/title";
import { Typography, Container, Grid, Paper } from "@material-ui/core";
import Form from "components/form/form";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  readOnlyFields,
  editableFields,
  extractedTextFields,
} from "../15cbDetailsFields";
import InputField from "components/form/inputField";
import PublishIcon from "@material-ui/icons/Publish";
import SendIcon from "@material-ui/icons/Send";
import CustomButton from "components/form/button";
import FileUpload from "components/fileUpload";
import CustomTextArea from "components/form/textArea";
import { getTransactionById } from "services/getTransactionById";
import { upload15caOrXml } from "services/upload15caOrXml";
import { upload15cb } from "services/upload15cb";

class Details extends Form {
  state = {
    data: {},
    transactionId: "",
    clientData: {},
    clientRemarks: {},
    textFrom15CB: {},
  };

  handleCaFieldsChange = ({ target }) => {
    const clientData = { ...this.state.clientData };
    clientData[target.name] = target.value;
    this.setState({ clientData });
    console.log(clientData);
  };

  async componentDidMount() {
    try {
      const { id } = this.props.match.params;
      this.setState({ transactionId: id });
      const result = await getTransactionById(id);
      this.setState({
        clientData: result.data.data.transcation,
        clientRemarks: result.data.data.transcation.userRemarks,
        textFrom15CB: result.data.data.transcation.textFrom15CB,
      });
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit = async () => {
    const transactionId = this.state.transactionId;
    const { ackNumber, udin, partyName } = this.state.clientData;
    const file15cb = this.state.data;
    if (file15cb.files) {
      try {
        const data = new FormData();
        data.append("documentType", "15cb");
        data.append("user", "admin");
        data.append("ackNumber", ackNumber);
        data.append("udin", udin);
        data.append("partyName", partyName);
        data.append("file", file15cb.files[0]);
        const result = await upload15cb(transactionId, data);
        if (result.status === 201) {
          toast.success("15CB uploaded succesfully");
          this.setState({
            loading: !this.state.loading,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Error Occured");
        this.setState({ loading: !this.state.loading });
      }
    } else {
      toast.error("Please upload 15CB");
    }
  };

  render() {
    const { clientData, clientRemarks, textFrom15CB } = this.state;

    return (
      <Fragment>
        <HtmlTitle title={"Add Client"} />
        <Grid>
          {console.log(this.state)}
          <ToastContainer autoClose={1500} closeButton={false} />
          <main className="content">
            <Container maxWidth="lg">
              <br />
              <Paper className="paper" elevation={4}>
                <Fragment>
                  <Typography
                    className="pageHeading"
                    component="h6"
                    variant="h6"
                  >
                    Downloads Available
                  </Typography>
                  <br />
                </Fragment>
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                >
                  <Grid item>
                    <a
                      href={clientData.invoiceLink}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                      rel="noopener noreferrer"
                    >
                      <CustomButton
                        variant="outlined"
                        color="secondary"
                        icon={<GetAppIcon />}
                        label="Invoice"
                      />
                    </a>
                  </Grid>
                  <Grid item>
                    <a
                      style={{ textDecoration: "none" }}
                      href={clientData.cbLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CustomButton
                        variant="outlined"
                        color="secondary"
                        icon={<GetAppIcon />}
                        label="15CB"
                      />
                    </a>
                  </Grid>
                </Grid>
              </Paper>
              <br />
              <Paper className="paper" elevation={4}>
                <Fragment>
                  <Typography
                    className="pageHeading"
                    component="h6"
                    variant="h6"
                  >
                    Transaction Details
                  </Typography>
                  <br />
                </Fragment>
                <Grid container spacing={3}>
                  {readOnlyFields.map((item) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <InputField
                          value={
                            item.value === "createdAt" ||
                            item.value === "trackingNumber"
                              ? clientData[item.value]
                              : clientRemarks[item.value]
                          }
                          helperText={item.helperText}
                          InputProps={{ readOnly: true }}
                          name={item.value}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
                <form onSubmit={this.handleSubmit}>
                  <Grid container spacing={3}>
                    {editableFields.map((item) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <InputField
                            className="editable-field-background"
                            value={clientData[item.value]}
                            onChange={this.handleCaFieldsChange}
                            name={item.value}
                            helperText={item.helperText}
                            InputProps={{ readOnly: false }}
                          />
                        </Grid>
                      );
                    })}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <CustomTextArea
                        variant="completed"
                        name="remarks"
                        placeholder="Type your remarks here, if any"
                        rows={3}
                        onChange={this.handleOnChange}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <CustomButton
                    variant="outlined"
                    color="secondary"
                    icon={<PublishIcon />}
                    label="15CB"
                    onClick={this.handleOpen}
                  />
                  <br />
                  <FileUpload
                    filesLimit={1}
                    handleOpen={this.handleOpen}
                    handleSave={this.handleSave}
                    open={this.state.data.open}
                  />
                  <div style={{ float: "right" }}>
                    <CustomButton
                      variant="contained"
                      color="primary"
                      icon={<SendIcon />}
                      label="Update 15CB Details"
                      type="submit"
                    />
                  </div>
                </form>
                <br />
              </Paper>
              <br />
              <Paper className="paper" elevation={4}>
                <Fragment>
                  <Typography
                    className="pageHeading"
                    component="h6"
                    variant="h6"
                  >
                    Text extracted from 15CB
                  </Typography>
                  <br />
                </Fragment>
                <Grid container spacing={3}>
                  {extractedTextFields.map((item) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <InputField
                          value={textFrom15CB[item.value]}
                          helperText={item.helperText}
                          InputProps={{ readOnly: true }}
                          name={item.value}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
                <br />
              </Paper>
              <br />
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}
export default Details;
