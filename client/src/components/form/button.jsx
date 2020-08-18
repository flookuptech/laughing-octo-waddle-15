import React, { Fragment } from "react";
import {
  Button,
  withStyles,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

// const BootstrapButton = withStyles({
//   root: {
//     boxShadow: "none",
//     textTransform: "none",
//     fontSize: 16,
//     padding: "6px 12px",
//     border: "2px solid",
//     lineHeight: 1.5,
//     fontWeight: "bold",
//     backgroundColor: "rgba(64, 101, 224, 1.0)",
//     borderColor: "rgba(64, 101, 224, 1.0)",
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:hover": {
//       backgroundColor: "rgba(0,0,0, 0.08)",
//       borderColor: "rgba(64, 101, 224, 1.0)",
//       color: "rgba(64, 101, 224, 1.0)",
//       boxShadow: "none",
//     },
//     // "&:active": {
//     //   boxShadow: "none",
//     //   backgroundColor: "#11fedc",
//     //   borderColor: "rgba(64, 101, 224, 1.0)",
//     // },
//     // "&:focus": {
//     //   boxShadow: "0 0 0 0.1rem rgba(64, 101, 224, 1.0)",
//     // },
//   },
// })(Button);

// const useStyles = makeStyles((theme) => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
// }));

const CustomButton = ({
  label,
  variant,
  color,
  onClick,
  type,
  loading,
  icon,
  component,
  to,
}) => {
  // const classes = useStyles();

  return (
    <Fragment>
      <Button
        variant={variant}
        color={color}
        startIcon={loading ? null : icon}
        // className={classes.margin}
        onClick={onClick}
        type={type}
        component={component}
        to={to}
      >
        {loading ? (
          <CircularProgress
            style={{
              color: "white",
            }}
            size="1.5rem "
          />
        ) : (
          <b>{label}</b>
        )}
      </Button>
    </Fragment>
  );
};

export default CustomButton;
