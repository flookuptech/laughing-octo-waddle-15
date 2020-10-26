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

const WorkspaceAuthentication = ({
  handleChange,
  onSubmit,
  errorWorkspace,
  loadingWorkspace,
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item md={12}>
        <Typography align="center" variant="h4" style={{ fontWeight: "bold" }}>
          Sign in to your workspace
        </Typography>
        <br />
        <Typography align="center" variant="h6" style={{ color: "#454245" }}>
          Enter your workspace name
        </Typography>
        <br />
        <br />
      </Grid>
      <Grid item md={4} xs={8}>
        <form onSubmit={onSubmit} method="POST">
          <TextField
            variant="outlined"
            label="Workspace"
            name="workspace"
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
            autoFocus={true}
          />
          <br />
          {errorWorkspace && (
            <Fragment>
              <Card className={classes.cardStyle}>{errorWorkspace}</Card>
            </Fragment>
          )}
          <br />
          <Button
            type="submit"
            fullWidth
            size="large"
            style={{
              backgroundColor: "#4065e0",
              color: "white",
              fontWeight: "bold",
            }}
            variant="contained"
          >
            {loadingWorkspace ? (
              <CircularProgress
                style={{
                  color: "white",
                }}
                size="1.5rem "
              />
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </Grid>
    </Fragment>
  );
};

export default WorkspaceAuthentication;
