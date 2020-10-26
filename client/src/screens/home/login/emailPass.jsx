import React, { Fragment } from "react";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  cardStyle: {
    backgroundColor: "#d9534f",
    color: "white",
    padding: 5,
  },
});

const EmailPassAuthentication = ({
  handleChange,
  onSubmit,
  errorEmailPass,
  loadingEmailPass,
}) => {
  const classes = useStyles();
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
            size="small"
            margin="normal"
            autoFocus={true}
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
            size="small"
            margin="normal"
            autoFocus={true}
          />
          <br />
          {errorEmailPass && (
            <Fragment>
              <Card className={classes.cardStyle}>{errorEmailPass}</Card>
            </Fragment>
          )}
          <br />
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
            {loadingEmailPass ? (
              <CircularProgress
                style={{
                  color: "white",
                }}
                size="1.5rem "
              />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Grid>
    </Fragment>
  );
};

export default EmailPassAuthentication;
