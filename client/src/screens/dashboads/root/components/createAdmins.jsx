import React, { Fragment } from "react";
import {
  Typography,
  Box,
  withStyles,
  Grid,
  Container
} from "@material-ui/core";

import { registerSenior } from "services/createCallsRoot";
import AdminDataFields from "./dataFields/createAdminFields";
import Form from "components/form/form";

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

class Organizations extends Form {
  state = {
    data: {
      companyName: "",
      panNumber: "",
      orgEmail: "",
      contact: "",
      designation: "",
      address: "",
      name: "",
      email: "",
      userType: "",
      role: ""
    }
  };

  onSubmit = async () => {
    // Call to backend to create organisation database
    try {
      const { data } = this.state;
      const register = await registerSenior(data);
      toast.success("Organization created");
      console.log(register);
    } catch (error) {
      toast.error("Organization creation failed!");
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Grid>
          <ToastContainer autoClose={1500} closeButton={false} />
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

export default withStyles(styles)(Organizations);
