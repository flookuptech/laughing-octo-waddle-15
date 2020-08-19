import React, { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import HtmlTitle from "components/title";
import { Typography, Container, Grid, Paper } from "@material-ui/core";
import Form from "components/form/form";
import { GetApp } from "@material-ui/icons";
import { getTransactionById } from "services/getTransactionById";
import { upload15cb } from "services/upload15cb";
import CustomButton from "components/form/button";
import TransactionDataFields from "./transactionDataFields";

class Details extends Form {
  state = {
    data: {},
    transactionId: "",
    loading: false,
    userId: "",
  };

  async componentDidMount() {
    const user = this.props.user;
    this.setState({ userId: user._id });
    const { id } = this.props.match.params;
    this.setState({ transactionId: id });
    const result = await getTransactionById(id);
    this.setState({
      data: result.data.data.transcation,
    });
  }

  onSubmit = async () => {
    const { transactionId, data, loading } = this.state;
    if (data.files) {
      this.setState({ loading: !loading });
      try {
        const data15cb = new FormData();
        data15cb.append("documentType", "15cb");
        data15cb.append("user", this.state.userId);
        data15cb.append("ackNumber", data.ackNumber);
        data15cb.append("udin", data.udin);
        data15cb.append("partyName", data.partyName);
        data15cb.append("adminRemarks", data.adminRemarks);
        data15cb.append("file", data.files[0]);
        const result = await upload15cb(transactionId, data15cb);
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
    const { data, loading } = this.state;

    return (
      <Fragment>
        <HtmlTitle title={"Pending 15CB"} />
        <Grid>
          <ToastContainer autoClose={1500} closeButton={false} />
          <main className="content">
            {Object.keys(data).length ? (
              <Container maxWidth="lg">
                <br />
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
                      href={data.invoiceLink}
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
                  </Fragment>
                  <br />
                  <br />
                  <TransactionDataFields
                    data={data}
                    handleSubmit={this.handleSubmit}
                    handleOnChange={this.handleOnChange}
                    handleOpen={this.handleOpen}
                    handleSave={this.handleSave}
                    open={data.open}
                    handleClose={this.handleClose}
                    loading={loading}
                  />
                </Paper>
                <br />
              </Container>
            ) : (
              <h1>Loading....</h1>
            )}
          </main>
        </Grid>
      </Fragment>
    );
  }
}
export default Details;
