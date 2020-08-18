import React, { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import HtmlTitle from "components/title";
import { Typography, Container, Grid, Paper, Divider } from "@material-ui/core";
import FileUpload from "components/fileUpload";
import CustomTextArea from "components/form/textArea";
import Form from "components/form/form";
import { GetApp, Publish, Send } from "@material-ui/icons";
import { readOnlyFields, editableFields } from "../15cbDetailsFields";
import InputField from "components/form/inputField";
import { getTransactionById } from "services/getTransactionById";
import { upload15cb } from "services/upload15cb";
import CustomButton from "components/form/button";

class Details extends Form {
  state = {
    data: {},
    clientData: {},
    transactionId: "",
    clientRemarks: {},
    loading: false,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ transactionId: id });
    const result = await getTransactionById(id);
    console.log(result);
    this.setState({
      clientData: result.data.data.transcation,
      clientRemarks: result.data.data.transcation.userRemarks,
    });
  }

  onSubmit = async () => {
    const transactionId = this.state.transactionId;
    const adminRemarks = this.state.data;
    if (adminRemarks.files) {
      this.setState({ loading: !this.state.loading });
      try {
        const data = new FormData();
        data.append("documentType", "15cb");
        data.append("user", "admin");
        data.append("ackNumber", adminRemarks.ackNumber);
        data.append("udin", adminRemarks.udin);
        data.append("partyName", adminRemarks.partyName);
        data.append("remarks", adminRemarks.remarks);
        data.append("file", adminRemarks.files[0]);
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
    const { clientData, clientRemarks } = this.state;

    return (
      <Fragment>
        <HtmlTitle title={"Pending 15CB"} />
        <Grid>
          <ToastContainer autoClose={1500} closeButton={false} />
          <main className="content">
            <Container maxWidth="lg">
              <br />}
              <Paper className="paper" elevation={4}>
                <Fragment>
                  <Typography
                    className="pageHeading"
                    component="h6"
                    variant="h6"
                  >
                    Client Remarks
                  </Typography>
                  <br />
                  <a
                    style={{ textDecoration: "none" }}
                    href={clientData.invoiceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CustomButton
                      variant="outlined"
                      color="secondary"
                      icon={<GetApp />}
                      label="Invoice"
                    />
                  </a>
                  <br />
                  <br />
                  <Grid container spacing={3}>
                    {readOnlyFields.map((item) => {
                      return (
                        <Grid item xs={6} md={4} lg={4}>
                          <InputField
                            value={
                              item.value === "partyName" ||
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
                </Fragment>
                <br />
                <Divider style={{ padding: 1 }} />
                <br />
                <Typography className="pageHeading" component="h6" variant="h6">
                  Add your inputs and remarks:
                </Typography>
                <br />
                <Fragment>
                  <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={3}>
                      {editableFields.map((item) => {
                        return (
                          <Grid item xs={6} md={4} lg={4}>
                            <InputField
                              required
                              helperText={item.helperText}
                              InputProps={{ readOnly: false }}
                              name={item.value}
                              onChange={this.handleOnChange}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                    <br />
                    <CustomTextArea
                      variant="pending"
                      onChange={this.handleOnChange}
                      name="remarks"
                      rows={3}
                      placeholder="Type your remarks here, if any"
                    />
                    <br />
                    <br />
                    <CustomButton
                      variant="outlined"
                      color="secondary"
                      icon={<Publish />}
                      onClick={this.handleOpen}
                      label="Upload 15CB"
                    />
                    <br />
                    <br />
                    <FileUpload
                      open={this.state.data.open}
                      handleSave={this.handleSave}
                      onClose={this.handleClose}
                    />
                    <div style={{ float: "right" }}>
                      <CustomButton
                        variant="contained"
                        loading={this.state.loading}
                        color="primary"
                        icon={<Send />}
                        label="Submit"
                        type="submit"
                      />
                    </div>
                  </form>
                </Fragment>
              </Paper>
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}
export default Details;
