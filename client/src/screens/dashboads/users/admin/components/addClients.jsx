import React, { Fragment } from "react";
import { Typography, Box, Container, Grid, Paper } from "@material-ui/core";
import UserDataFields from "./dataFields/userDataFields";
import Form from "components/form/form";
import { createClient } from "services/createUser";
import "react-toastify/dist/ReactToastify.css";
import * as Sentry from "@sentry/browser";
import { ToastContainer, toast } from "react-toastify";
import HtmlTitle from "components/title";

class AddUsers extends Form {
  state = {
    data: {},
  };

  onSubmit = async () => {
    const data = {
      ...this.state.data,
      userType: "client",
    };
    try {
      const result = await createClient(data);
      if (result.status == 201) toast.success("User created successfully");
    } catch (error) {
      toast.error("User creation failed");
    }
  };

  render() {
    return (
      <Fragment>
        <HtmlTitle title={"Add Client"} />
        <Grid>
          <ToastContainer autoClose={1500} closeButton={false} />
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
                    ADD CLIENT
                  </Typography>
                </div>
                <br />
                <div>
                  <UserDataFields
                    onSubmit={this.handleSubmit}
                    onChange={this.handleOnChange}
                  />
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

export default AddUsers;
