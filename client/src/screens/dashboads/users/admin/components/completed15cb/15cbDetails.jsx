import React, { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import HtmlTitle from "components/title";
import { Typography, Container, Grid, Paper } from "@material-ui/core";
import Form from "components/form/form";
import { extractedTextFields } from "../15cbDetailsFields";
import InputField from "components/form/inputField";
import { GetApp } from "@material-ui/icons";
import CustomButton from "components/form/button";
import { getTransactionById } from "services/getTransactionById";
import { upload15cb } from "services/upload15cb";
import { uploadXml } from "services/uploadXml";
import TransactionDataFields from "./transactionDataFields";

class Details extends Form {
  state = {
    data: {},
    transactionId: "",
    userId: "",
    loading15cb: false,
  };

  async componentDidMount() {
    try {
      const user = this.props.user;
      this.setState({ userId: user._id });
      const { id } = this.props.match.params;
      this.setState({ transactionId: id });
      const result = await getTransactionById(id);
      this.setState({
        data: result.data.data.transcation,
      });
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit = async () => {
    const { transactionId, userId, data, loading15cb } = this.state;
    const { ackNumber, udin, partyName, adminRemarks } = this.state.data;
    if (data.files) {
      this.setState({ loading15cb: !loading15cb });
      try {
        const update15cb = new FormData();
        update15cb.append("documentType", "15cb");
        update15cb.append("user", this.state.userId);
        update15cb.append("ackNumber", ackNumber);
        update15cb.append("udin", udin);
        update15cb.append("adminRemarks", adminRemarks);
        update15cb.append("partyName", partyName);
        update15cb.append("file", data.files[0]);
        const result = await upload15cb(transactionId, update15cb);
        if (result.status === 201) {
          toast.success("15CB updated succesfully");
          this.setState({ loading15cb: !this.state.loading15cb });
        }
      } catch (error) {
        console.log(error);
        toast.error("Error Occured");
        this.setState({ loading15cb: !this.state.loading15cb });
      }
    } else {
      toast.error("Please upload 15CB");
    }
  };

  render() {
    const { data, loading15cb } = this.state;
    return (
      <Fragment>
        <HtmlTitle title={"15CB Details"} />
        {Object.keys(data).length ? (
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
                        href={data.invoiceLink}
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
                        href={data.cbLink}
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
                    {data.caLink ? (
                      <Grid item>
                        <a
                          style={{ textDecoration: "none" }}
                          href={data.caLink}
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
                    <TransactionDataFields
                      data={data}
                      handleSubmit={this.handleSubmit}
                      handleOnChange={this.handleOnChange}
                      handleOpen={this.handleOpen}
                      handleSave={this.handleSave}
                      open={data.open}
                      handleClose={this.handleClose}
                      loading15cb={loading15cb}
                    />
                  </Fragment>
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
                            value={data.textFrom15CB[item.value]}
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
        ) : (
          <h1>Loading...</h1>
        )}
      </Fragment>
    );
  }
}
export default Details;
