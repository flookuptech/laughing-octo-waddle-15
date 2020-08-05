import React, { Fragment } from "react";
import { Grid, Typography, Container, withStyles, Paper, Box } from "@material-ui/core";
import Form from "components/form/form";
import http from "services/httpServices";
import FileUpload from "components/fileUpload";
import CustomButton from "components/form/button";
import UploadInvoiceDataFields from "./dataFields/uploadInvoiceFields";
import HtmlTitle from "components/title";

const styles = {
  pageHeading: {
    fontWeight: 'bold'
  },
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    opacity: "1",
    padding: "15px"
  },
  content: {
    flexGrow: 1,
    height: "auto",
    overflow: "none",
    width: '75vw'
  },
  paper:{
    display: 'flex',
    flexDirection: "column",
    overflow: 'auto',
    padding: 32
  }
};

class UploadInvoice extends Form {
  state = {
    data: {}
  };

  onSubmit = () => {
    console.log(this.state.data);
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <HtmlTitle title={"Upload Invoice"} />
        <Grid>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <Paper className={classes.paper} elevation={4}>
                <Box className={classes.boxBorder}>
                  <div>
                    <Typography className={classes.pageHeading} component="h5" variant="h5">
                      Initiate Invoice file
                    </Typography>
                  </div><br />
                  <div>
                    <form onSubmit={this.handleSubmit}>
                      <Fragment>
                        <UploadInvoiceDataFields
                          onChange={this.handleOnChange}
                          onSubmit={this.handleSubmit}
                        />
                      </Fragment>
                      <Fragment>
                        <Grid container direction="row" justify="flex-end">
                          <Grid item>
                            <FileUpload
                              handleClose={this.handleClose}
                              handleOpen={this.handleOpen}
                              handleSave={this.handleSave}
                              open={this.state.data.open}
                            />
                          </Grid>
                          <Grid item>
                            <CustomButton name="Submit" type="submit" />
                          </Grid>
                        </Grid>
                      </Fragment>
                    </form>
                  </div>
                  <br />
                </Box>
              </Paper><br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(UploadInvoice);
