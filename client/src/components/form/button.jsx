import React, { Fragment } from "react";

import { Button, withStyles, makeStyles } from "@material-ui/core";

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#28a745",
    borderColor: "#28a745",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      backgroundColor: "#218838",
      borderColor: "#1e7e34",
      boxShadow: "none"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#1e7e34",
      borderColor: "##1c7430"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(72,180,97,.5)"
    }
  }
})(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const CustomButton = ({ name, onClick, type }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <BootstrapButton
        variant="contained"
        color="primary"
        disableRipple
        className={classes.margin}
        onClick={onClick}
        type={type}
      >
        {name}
      </BootstrapButton>
    </Fragment>
  );
};

export default CustomButton;
