import React, { Fragment } from "react";
import { Grid, Typography, Container, Paper } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import Form from "components/form/form";
import { uploadClientInvoice } from "services/uploadClientInvoice";
import FileUpload from "components/fileUpload";
import { Publish, Send } from "@material-ui/icons";
import CustomButton from "components/form/button";
import UploadInvoiceDataFields from "./dataFields/uploadInvoiceFields";
import HtmlTitle from "components/title";

class UploadInvoice extends Form {
  state = {
    data: {},
    loading: false,
    user: {},
  };

  componentDidMount() {
    const { user } = this.props;
    this.setState({ user });
  }

  onSubmit = async () => {
    const invoiceData = { ...this.state.data };
    const user = this.state.user;
    if (invoiceData.files) {
      this.setState({ loading: !this.state.loading });
      try {
        const data = new FormData();
        data.append("documentType", "invoice");
        data.append("tdsRate", invoiceData.tdsRate);
        data.append("remittanceCurrency", invoiceData.remittanceCurrency);
        data.append("remittanceNature", invoiceData.remittanceNature);
        data.append("purposeCode", invoiceData.purposeCode);
        data.append("taxPaid", invoiceData.taxPaid);
        data.append("trc", invoiceData.trc);
        data.append("user", user._id);
        data.append("clientRemarks", invoiceData.clientRemarks);
        for (var x = 0; x < invoiceData.files.length; x++) {
          data.append("invoices", invoiceData.files[x]);
        }
        const result = await uploadClientInvoice(data);
        if (result.status === 201) {
          toast.success("Invoice files uploaded succesfully");
          this.setState({
            data: {},
            loading: !this.state.loading,
          });
        }
      } catch (error) {
        toast.error(error.response.data.message);
        this.setState({ loading: !this.state.loading });
      }
    } else {
      toast.error("Please upload Invoice files");
    }
  };

  render() {
    return (
      <Fragment>
        <HtmlTitle title={"Upload Invoice"} />
        <Grid>
          <ToastContainer autoClose={1500} />
          <main className="content">
            <Container maxWidth="lg">
              <br />
              <Paper className="paper" elevation={4}>
                <div>
                  <Typography
                    className="pageHeading"
                    component="h5"
                    variant="h5"
                  >
                    INITIATE TRANSACTION
                  </Typography>
                </div>
                <br />
                <br />
                <div>
                  <form onSubmit={this.handleSubmit}>
                    <Fragment>
                      <UploadInvoiceDataFields
                        onChange={this.handleOnChange}
                        onSubmit={this.handleSubmit}
                      />
                    </Fragment>
                    <br />
                    <CustomButton
                      variant="outlined"
                      color="secondary"
                      icon={<Publish />}
                      onClick={this.handleOpen}
                      label="Invoice"
                    />
                    <FileUpload
                      handleClose={this.handleClose}
                      filesLimit={5}
                      acceptedFiles="application/pdf"
                      handleOpen={this.handleOpen}
                      handleSave={this.handleSave}
                      open={this.state.data.open}
                    />
                    <div style={{ float: "right" }}>
                      <CustomButton
                        color="primary"
                        variant="contained"
                        label="Submit"
                        icon={<Send />}
                        type="submit"
                        loading={this.state.loading}
                      />
                    </div>
                  </form>
                </div>
                <br />
              </Paper>
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default UploadInvoice;
