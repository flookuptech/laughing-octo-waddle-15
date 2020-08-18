import React, { Component, Fragment } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import InputField from "components/form/inputField";
import { SelectField } from "components/form/select";

class CreateAdminFields extends Component {
  render() {
    const role = [
      {
        value: "admin",
        label: "Admin",
      },
      {
        value: "super",
        label: "Super",
      },
    ];

    const userType = [
      {
        value: "client",
        label: "Client",
      },
    ];

    const { onSubmit, onChange, hasError } = this.props;
    return (
      <Fragment>
        <form onSubmit={onSubmit}>
          <div>
            <Grid container spacing={3}>
              <Grid item xs={6} md={4} lg={4}>
                <InputField
                  required
                  id="companyName"
                  label="Company Name"
                  name="companyName"
                  onChange={onChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} md={4} lg={4}>
                <InputField
                  required
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={4}>
                <InputField
                  required
                  id="companyEmail"
                  label="Company Email"
                  name="companyEmail"
                  type="email"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={4}>
                <InputField
                  required
                  id="phone"
                  label="Contact number"
                  name="phone"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={4}>
                <InputField
                  required
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={4}>
                <InputField
                  required
                  id="email"
                  label="Admin Email"
                  type="email"
                  name="email"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={4}>
                <InputField
                  required
                  id="designation"
                  label="Designation"
                  name="designation"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={4}>
                <SelectField
                  onChange={onChange}
                  options={role}
                  label="Role"
                  name="userRole"
                />
              </Grid>
              <Grid item xs={6} md={4} lg={4}>
                <SelectField
                  onChange={onChange}
                  options={userType}
                  label="User Type"
                  name="userType"
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <div>
                  <Button variant="contained" color="secondary" type="submit">
                    Register
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default CreateAdminFields;
