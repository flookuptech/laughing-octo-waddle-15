import React, { Fragment } from "react";
import {
  Typography,
  Box,
  withStyles,
  Grid,
  Container,
  Paper,
} from "@material-ui/core";
import Form from "components/form/form";
import HtmlTitle from "components/title";
import AdminDataFields from "./dataFields/createAdminFields";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { createTenantOrRoot } from "services/createUser";

const styles = {
  pageHeading: {
    fontWeight: "bold",
  },
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    opacity: "1",
    padding: "15px",
  },
  content: {
    flexGrow: 1,
    height: "auto",
    overflow: "none",
    width: "75vw",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: 32,
  },
};

class RegisterAdmin extends Form {
  state = {
    data: { hasError: false },
  };

  onSubmit = async () => {
    // Call to backend to create organisation database
    try {
      const { data } = this.state;
      const userDetails = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      };
      // const userDetails = new FormData();
      // userDetails.append("firstName", data.firstName);
      // userDetails.append("lastName", data.lastName);
      // userDetails.append("email", data.email);
      // userDetails.append("phone", data.phone);
      // userDetails.append("designation", data.designation);
      // userDetails.append("companyName", data.companyName);
      // userDetails.append("companyEmail", data.companyEmail);
      // userDetails.append("userType", data.userType);
      // userDetails.append("userRole", data.userRole);
      const result = await createTenantOrRoot(userDetails);
      console.log(result);
    } catch (error) {
      toast.error("Organization creation failed!");
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <HtmlTitle title={"Create Admin"} />
        <Grid>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <Paper className={classes.paper} elevation={4}>
                <Box className={classes.boxBorder}>
                  <div>
                    <Typography
                      className={classes.pageHeading}
                      component="h5"
                      variant="h5"
                    >
                      Register Admin
                    </Typography>
                  </div>
                  <br />
                  <Fragment>
                    <AdminDataFields
                      onSubmit={this.handleSubmit}
                      onChange={this.handleOnChange}
                      hasError={this.state.data.hasError}
                    />
                  </Fragment>
                </Box>
              </Paper>
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(RegisterAdmin);
