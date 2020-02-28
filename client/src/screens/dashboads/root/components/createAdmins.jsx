import React, { Fragment } from "react";
import {
  Typography,
  Box,
  withStyles,
  Grid,
  Container
} from "@material-ui/core";

import Form from "components/form/form";
import HtmlTitle from "components/title";
import AdminDataFields from "./dataFields/createAdminFields";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const styles = {
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    opacity: "1",
    padding: "15px"
  },
  content: {
    flexGrow: 1,
    overflow: "auto"
  }
};

class RegisterAdmin extends Form {
  state = {
    data: { hasError: false }
  };

  onSubmit = async () => {
    // Call to backend to create organisation database
    try {
      const { data } = this.state;
      console.log(data);
    } catch (error) {
      toast.error("Organization creation failed!");
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <HtmlTitle title={"Create Admin"} />
        <ToastContainer autoClose={1500} closeButton={false} />
        <Grid>
          <main className={classes.content}>
            <Container>
              <br />
              <Typography component="h5" variant="h5">
                Register Admin
              </Typography>
              <br />
              <Fragment>
                <AdminDataFields
                  onSubmit={this.handleSubmit}
                  onChange={this.handleOnChange}
                  hasError={this.state.data.hasError}
                />
                <br />
              </Fragment>
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(RegisterAdmin);
