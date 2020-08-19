import React, { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import HtmlTitle from "components/title";
import { Typography, Container, Grid, Paper } from "@material-ui/core";
import Form from "components/form/form";
import { GetApp } from "@material-ui/icons";
import CustomButton from "components/form/button";
import { getTransactionById } from "services/getTransactionById";
import { upload15caOrXml } from "services/upload15caOrXml";
import TransactionDataFields from "./transactionDataFields";

class Details extends Form {
  state = {
    data: {},
    transactionId: "",
    loading: false,
    user: "",
  };

  async componentDidMount() {
    const user = this.props.user;
    this.setState({ user });
    const { id } = this.props.match.params;
    this.setState({ transactionId: id });
    const result = await getTransactionById(id);
    this.setState({
      data: result.data.data.transcation,
    });
  }

  onSubmit = async () => {
    const { data, transactionId, loading, user } = this.state;
    if (data.files) {
      this.setState({ loading: !loading });
      try {
        const data15ca = new FormData();
        data15ca.append("documentType", "15ca");
        data15ca.append("user", user._id);
        data15ca.append("file", data.files[0]);
        const result = await upload15caOrXml(transactionId, data15ca);
        if (result.status === 201) {
          this.setState({ loading: !this.state.loading });
          toast.success("15CA successfully uploaded");
        }
      } catch (error) {
        this.setState({ loading15ca: !loading });
        console.log(error);
      }
    } else {
      toast.error("No 15CA Selected");
    }
  };

  render() {
    const { data, loading } = this.state;

    return (
      <Fragment>
        <HtmlTitle title={"Completed 15CB"} />
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
                      handleOpen={this.handleOpen}
                      handleSave={this.handleSave}
                      handleClose={this.handleClose}
                      loading={loading}
                    />
                  </Fragment>
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
