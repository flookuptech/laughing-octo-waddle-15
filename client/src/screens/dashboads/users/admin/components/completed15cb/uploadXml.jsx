import React, { Fragment } from "react";
import { toast } from "react-toastify";
import { Typography, Grid } from "@material-ui/core";
import Form from "components/form/form";
import { Publish, Send } from "@material-ui/icons";
import CustomButton from "components/form/button";
import { uploadXml } from "services/uploadXml";
import FileUpload from "components/fileUpload";

class UploadXml extends Form {
  state = {
    data: {},
    loading: false,
    userId: "",
    transactionId: "",
  };

  async componentDidMount() {
    try {
      const { transactionId } = this.props;
      this.setState({ transactionId });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  onSubmit = async () => {
    const { transactionId, data, loading } = this.state;
    if (data.files) {
      this.setState({ loading: !loading });
      try {
        const xmlFile = new FormData();
        xmlFile.append("documentType", "xml");
        xmlFile.append("file", data.files[0]);
        const result = await uploadXml(transactionId, xmlFile);
        if (result.status === 201) {
          toast.success("XML uploaded succesfully");
          this.setState({ loading: !this.state.loading });
        }
      } catch (error) {
        toast.error(error.response.data.message);
        this.setState({ loading: !this.state.loading });
      }
    } else {
      toast.error("Please select a XML File to upload");
    }
  };

  render() {
    const { data, loading } = this.state;
    return (
      <Fragment>
        <Typography className="pageHeading" component="h6" variant="h6">
          Upload XML
        </Typography>
        <br />
        <form onSubmit={this.handleSubmit}>
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
                onClick={this.handleOpen}
              />
              <FileUpload
                filesLimit={1}
                handleSave={this.handleSave}
                open={data.open}
                handleClose={this.handleClose}
                acceptedFiles=".xml"
              />
            </Grid>
            <Grid item>
              <CustomButton
                variant="contained"
                color="primary"
                icon={<Send />}
                label="XML"
                loading={loading}
                type="submit"
              />
            </Grid>
          </Grid>
        </form>
      </Fragment>
    );
  }
}

export default UploadXml;
