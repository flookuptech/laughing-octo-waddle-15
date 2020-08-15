import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";
import InputField from "components/form/inputField";
import { SelectField } from "components/form/select";
import CustomButton from "components/form/button";

class userDataFields extends Component {
  state = {};

  render() {
    const role = [
      {
        value: "client",
        label: "Client",
      },
      {
        value: "admin",
        label: "Admin",
      },
    ];
    const { onChange, onSubmit } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={6}>
              <InputField
                required
                id="firstName"
                label="First Name"
                name="firstName"
                autoFocus
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <InputField
                required
                id="lastName"
                label="Last Name"
                name="lastName"
                autoFocus
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <InputField
                required
                id="email"
                label="Email"
                type="email"
                name="email"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <InputField
                required
                id="phone"
                label="Contact"
                name="phone"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <InputField
                required
                id="designation"
                label="Designation"
                name="designation"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <InputField
                required
                id="companyName"
                label="Company Name"
                name="companyName"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <InputField
                required
                id="companyEmail"
                label="Company Email"
                type="email"
                name="companyEmail"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={6}>
              <SelectField
                onChange={onChange}
                options={role}
                label="Role"
                name="userRole"
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <CustomButton
                label="Register User"
                type="submit"
                variant="contained"
                color="primary"
              />
            </Grid>
          </Grid>
        </div>
      </form>
    );
  }
}

export default userDataFields;
