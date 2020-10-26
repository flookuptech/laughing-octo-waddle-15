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
    errorWorkspace: "",
    errorEmailPass: "",
    loadingWorkspace: false,
    loadingEmailPass: false,
  };

  onWorkSpaceSubmit = async (e) => {
    e.preventDefault();
    const { data, workspaceMatch, loadingWorkspace } = this.state;
    if (data.workspace) {
      this.setState({ loadingWorkspace: !loadingWorkspace });
      try {
        const workspace = {
          workspace: data.workspace,
        };
        const result = await workspaceAuthentication(workspace);
        if (result.data.data.workspaceExists) {
          this.setState({
            workspaceMatch: !workspaceMatch,
            loadingWorkspace: !loadingWorkspace,
          });
        } else {
          this.setState({
            loadingWorkspace: !this.state.loadingWorkspace,
            errorWorkspace: "Invalid Workspace Id provided",
          });
        }
      } catch (error) {
        this.setState({ errorWorkspace: error.response.data.message });
      }
    } else {
      this.setState({
        errorWorkspace: "Please enter your Workspace Id in order to continue",
      });
    }
  };

  onEmailPassSubmit = async (e) => {
    e.preventDefault();
    const { data, loadingEmailPass } = this.state;
    if (data.email && data.password) {
      this.setState({
        loadingEmailPass: !loadingEmailPass,
      });
      try {
        const emailPass = {
          email: data.email,
          password: data.password,
        };
        const result = await emailPassAuthentication(emailPass);
        if (result.status === 200) {
          this.setState({ loadingEmailPass: !this.state.loadingEmailPass });
          window.location = "/dashboard/";
        } else {
          this.setState({
            errorEmailPass: result,
            loadingEmailPass: !this.state.loadingEmailPass,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      this.setState({
        errorEmailPass: "Please enter your Email Id and Password to login ",
      });
    }
  };

  render() {
    const {
      workspaceMatch,
      errorWorkspace,
      errorEmailPass,
      loadingWorkspace,
      loadingEmailPass,
    } = this.state;

    return (
      <Fragment>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ marginTop: "10vh" }}
        >
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
              loadingWorkspace={loadingWorkspace}
              handleChange={this.handleOnChange}
              onSubmit={this.onWorkSpaceSubmit}
              errorWorkspace={errorWorkspace}
            />
          ) : (
            <EmailPassAuthentication
              loadingEmailPass={loadingEmailPass}
              handleChange={this.handleOnChange}
              onSubmit={this.onEmailPassSubmit}
              errorEmailPass={errorEmailPass}
            />
          )}
        </Grid>
      </Fragment>
    );
  }
}

export default Login;
