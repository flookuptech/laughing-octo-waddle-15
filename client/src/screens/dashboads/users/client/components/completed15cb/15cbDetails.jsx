import React, { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import HtmlTitle from "components/title";
import { Typography, Container, Grid, Paper } from "@material-ui/core";
import Form from "components/form/form";
import { GetApp, Publish, Send } from "@material-ui/icons";
import { transactionDetailsDataFields } from "./15cbDetailsDataFields";
import InputField from "components/form/inputField";
import CustomButton from "components/form/button";
import FileUpload from "components/fileUpload";
import { getTransactionById } from "services/getTransactionById";
import { upload15caOrXml } from "services/upload15caOrXml";

class Details extends Form {
  state = {
    data: {},
    transactionId: "",
    clientData: {},
    clientRemarks: {},
    textFrom15cb: {},
    loading15ca: false,
    loadingXml: false,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ transactionId: id });
    const result = await getTransactionById(id);
    this.setState({
      clientData: result.data.data.transcation,
      clientRemarks: result.data.data.transcation.userRemarks,
      textFrom15cb: result.data.data.transcation.textFrom15CB,
    });
  }

  // handle15caSave = (files) => {
  //   const data = { ...this.state.data };
  //   data.files15ca = files;
  //   data.open = false;
  //   this.setState({
  //     data,
  //   });
  // };

  handleXmlSave = (files) => {
    const data = { ...this.state.data };
    data.filesXml = files;
    data.open = false;
    this.setState({
      data,
    });
  };

  // on15caSubmit = async (e) => {
  //   e.preventDefault();
  //   const { data, transactionId } = this.state;
  //   if (data.files15ca) {
  //     this.setState({ loading15ca: true });
  //     try {
  //       const data15ca = new FormData();
  //       data15ca.append("documentType", "15ca");
  //       data15ca.append("user", "flookup");
  //       data15ca.append("file", data.files15ca[0]);
  //       const result = await upload15caOrXml(transactionId, data15ca);
  //       if (result.status === 201) {
  //         this.setState({ loading15ca: false, data: {} });
  //         toast.success("15CA successfully uploaded");
  //       }
  //     } catch (error) {
  //       this.setState({ loading15ca: false });
  //       console.log(error);
  //     }
  //   } else {
  //     toast.error("No 15CA Selected");
  //   }
  // };

  onXmlSubmit = async (e) => {
    e.preventDefault();
    const { data, transactionId } = this.state;
    if (data.filesXml) {
      this.setState({ loadingXml: true });
      try {
        const dataXml = new FormData();
        dataXml.append("documentType", "xml");
        dataXml.append("user", "flookup");
        dataXml.append("file", data.filesXml[0]);
        const result = await upload15caOrXml(transactionId, dataXml);
        if (result.status === 201) {
          this.setState({ loadingXml: false });
          toast.success("XML successfully uploaded");
        }
      } catch (error) {
        this.setState({ loadingXml: false });
        console.log(error);
      }
    } else {
      toast.error("No XML Selected");
    }
  };

  render() {
    const { clientData, clientRemarks } = this.state;

    return (
      <Fragment>
        <HtmlTitle title={"Completed 15CB"} />
        <Grid>
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
                  {console.log(this.state)}
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
                        icon={<GetApp />}
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
                        icon={<GetApp />}
                        label="15CB"
                      />
                    </a>
                  </Grid>
                  {clientData.caLink ? (
                    <Grid item>
                      <a
                        style={{ textDecoration: "none" }}
                        href={clientData.caLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <CustomButton
                          variant="outlined"
                          color="secondary"
                          icon={<GetApp />}
                          label="15CA"
                        />
                      </a>
                    </Grid>
                  ) : null}
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
                  {transactionDetailsDataFields.map((item) => {
                    return (
                      <Grid item xs={6} md={4} lg={4}>
                        <InputField
                          value={
                            item.value === "createdAt" ||
                            item.value === "ackNumber" ||
                            item.value === "udin" ||
                            item.value === "partyName"
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
                    Upload 15CA or XML
                  </Typography>
                  <br />
                </Fragment>
                <Grid>
                  {/* {!clientData.caLink ? (
                    <Fragment>
                      <form onSubmit={this.on15caSubmit}>
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
                              onClick={this.handleOpen}
                              icon={<Publish />}
                              label="15CA"
                            />
                            <FileUpload
                              open={this.state.data.open}
                              handleSave={this.handle15caSave}
                              handleClose={this.handleClose}
                              filesLimit={1}
                            />
                          </Grid>
                          <Grid item>
                            <CustomButton
                              variant="contained"
                              loading={this.state.loading15ca}
                              color="primary"
                              icon={<Send />}
                              label="15CA"
                              type="submit"
                            />
                          </Grid>
                        </Grid>
                      </form>
                      <br />
                      <br />
                    </Fragment>
                  ) : null} */}
                  {!clientData.xmlLink ? (
                    <Fragment>
                      <form onSubmit={this.onXmlSubmit}>
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
                              onClick={this.handleOpen}
                              icon={<Publish />}
                              label="XML"
                            />
                            <FileUpload
                              open={this.state.data.open}
                              handleSave={this.handleXmlSave}
                              handleClose={this.handleClose}
                              filesLimit={1}
                            />
                          </Grid>
                          <Grid item>
                            <CustomButton
                              variant="contained"
                              color="primary"
                              loading={this.state.loadingXml}
                              icon={<Send />}
                              label="XML"
                              type="submit"
                            />
                          </Grid>
                        </Grid>
                      </form>
                    </Fragment>
                  ) : null}
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
