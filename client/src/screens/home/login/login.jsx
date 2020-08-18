import React, { Fragment } from "react";
import WorkspaceAuthentication from "./workspace";
import { Grid } from "@material-ui/core";
import EmailPassAuthentication from "./emailPass";
import BrandLogo from "assets/images/brand/15cacb.png";
import Form from "components/form/form";
import {
  workspaceAuthentication,
  emailPassAuthentication,
} from "services/auth";

class Login extends Form {
  state = {
    data: {},
    workspaceMatch: false,
  };

  onWorkSpaceSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        workspace: this.state.data.workspace,
      };
      console.log(data);
      const result = await workspaceAuthentication(data);
      if (result.data.data.workspaceExists) {
        this.setState({ workspaceMatch: !this.state.workspaceMatch });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onEmailPassSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: this.state.data.email,
        password: this.state.data.password,
      };
      const result = await emailPassAuthentication(data);
      console.log(result);
      if (result.status === 200) {
        window.location = "/dashboard/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { workspaceMatch } = this.state;

    return (
      <Fragment>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ marginTop: "10vh" }}
        >
          {console.log(this.state)}
          <Grid item xs={12} md={12} lg={12}>
            <img
              src={BrandLogo}
              style={{
                marginBottom: "5vh",
                width: "45vh",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              alt="15CACB Logo"
            />
          </Grid>
          {!workspaceMatch ? (
            <WorkspaceAuthentication
              style={{ marginTop: "50vh" }}
              handleChange={this.handleOnChange}
              onSubmit={this.onWorkSpaceSubmit}
            />
          ) : (
            <EmailPassAuthentication
              handleChange={this.handleOnChange}
              onSubmit={this.onEmailPassSubmit}
            />
          )}
        </Grid>
      </Fragment>
    );
  }
}

export default Login;
