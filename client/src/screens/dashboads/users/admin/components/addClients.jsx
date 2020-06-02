import React, { Fragment } from "react";
import { Typography, Box, Container, Grid, Paper } from "@material-ui/core";
import UserDataFields from "./dataFields/userDataFields";
import Form from "components/form/form";
import { createUser } from "services/createUserSenior";
import "react-toastify/dist/ReactToastify.css";
import * as Sentry from "@sentry/browser";
import { ToastContainer, toast } from "react-toastify";
import HtmlTitle from "components/title";

class AddUsers extends Form {
  state = {
    data: {
      name: "",
      email: "",
      role: "",
      designation: "",
      panNumber: "",
      contact: ""
    },
    companyName: "",
    registeredBy: ""
  };

  UNSAFE_componentWillMount() {
    const { user } = this.props;
    const companyName = user.companyName;
    const currentUser = user.name;
    this.setState({ companyName, registeredBy: currentUser });
  }

  onSubmit = async () => {
    const data = {
      ...this.state.data,
      companyName: this.state.companyName,
      registeredBy: this.state.registeredBy
    };
    try {
      const { status } = await createUser(data);
      if (status == 200) toast.success("User created");
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
                <Box className="boxBorder">
                  <div>
                    <Typography className="pageHeading" component="h5" variant="h5">
                      Register Users
                    </Typography>
                  </div><br />
                  <div>
                  <UserDataFields
                    onSubmit={this.handleSubmit}
                    onChange={this.handleOnChange}
                  />
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

export default AddUsers;
