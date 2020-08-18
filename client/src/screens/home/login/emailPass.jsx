import React, { Fragment } from "react";
import { Typography, Button, TextField, Grid } from "@material-ui/core";

const EmailPassAuthentication = ({ handleChange, onSubmit }) => {
  return (
    <Fragment>
      <Grid item md={12}>
        <Typography align="center" variant="h4" style={{ fontWeight: "bold" }}>
          Sign in to Finance Lookup Advisors
        </Typography>
        <br />
        <br />
      </Grid>
      <Grid item md={4} xs={8}>
        <form onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            onChange={handleChange}
            fullWidth
            required
          />
          <br />
          <br />
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            name="password"
            onChange={handleChange}
            fullWidth
            required
          />
          <br /> <br />
          <Button
            type="submit"
            size="large"
            fullWidth
            style={{
              backgroundColor: "#4065e0",
              color: "white",
              fontWeight: "bold",
            }}
            variant="contained"
          >
            Sign In
          </Button>
        </form>
      </Grid>
    </Fragment>
  );
};

export default EmailPassAuthentication;
