import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { withStyles, Button, Typography } from "@material-ui/core";

const styles = () => ({
  root: {
    display: "flex",
    backgroundColor: "white"
  },
  header: {
    fontWeight: 900,
    minWidth: 0,
    fontSize: 18
  },
  grow: {
    flexGrow: 1
  }
});

const Navbar = ({ classes, companyName }) => {
  return (
    <Fragment style={{ backgroundColor: "white" }}>
      <Typography noWrap className={classes.header}>
        Dashboard
      </Typography>
      <div className={classes.grow} />
      <Typography noWrap className={classes.header}>
        {companyName}
      </Typography>
      <div className={classes.grow} />
      <Button
        variant="outlined"
        color="secondary"
        component={Link}
        to="/logout"
      >
        Logout
      </Button>
    </Fragment>
  );
};

export default withStyles(styles)(Navbar);
