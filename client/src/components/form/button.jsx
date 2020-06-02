import React, { Fragment } from "react";
import { Button, withStyles, makeStyles } from "@material-ui/core";

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "2px solid",
    lineHeight: 1.5,
    fontWeight: "bold",
    backgroundColor: "rgba(64, 101, 224, 1.0)",
    borderColor: "rgba(64, 101, 224, 1.0)",
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
      backgroundColor: "rgba(0,0,0, 0.08)",
      borderColor: "rgba(64, 101, 224, 1.0)",
      color: "rgba(64, 101, 224, 1.0)",
      boxShadow: "none"
    }
    // "&:active": {
    //   boxShadow: "none",
    //   backgroundColor: "#11fedc",
    //   borderColor: "rgba(64, 101, 224, 1.0)"
    // }
    // "&:focus": {
    //   boxShadow: "0 0 0 0.2rem rgba(64, 101, 224, 1.0)"
    // }
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
