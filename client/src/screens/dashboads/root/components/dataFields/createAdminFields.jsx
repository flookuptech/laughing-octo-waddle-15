import React, { Component, Fragment } from "react";
import { Grid, Button, TextField } from "@material-ui/core";

import InputField from "components/form/inputField";
import { SelectFieldRole } from "components/form/select";

class CreateAdminFields extends Component {
  render() {
    const role = [
      {
        role: "admin",
        label: "Admin"
      }
    ];

    const { onSubmit, onChange, hasError } = this.props;
    return (
      <Fragment>
        <form onSubmit={onSubmit}>
          <div>
            <Grid container spacing={3}>
              <Grid item xs={6} md={4} lg={3}>
                <InputField
                  required
                  id="companyName"
                  label="Company Name"
                  name="companyName"
                  onChange={onChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <InputField
                  required
                  id="panNumber"
                  label="Pan Number"
                  name="panNumber"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <InputField
                  required
                  id="orgEmail"
                  label="Company Email"
                  name="orgEmail"
                  type="email"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <InputField
                  required
                  id="contact"
                  label="Contact number"
                  name="contact"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <InputField
                  required
                  id="address"
                  label="Address"
                  name="address"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <InputField
                  required
                  id="name"
                  label="Name of Admin"
                  name="name"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <InputField
                  required
                  id="email"
                  label="Admin Email"
                  type="email"
                  name="email"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <InputField
                  required
                  id="designation"
                  label="Designation"
                  name="designation"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <SelectFieldRole
                  onChange={onChange}
                  role={role}
                  hasError={hasError}
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
