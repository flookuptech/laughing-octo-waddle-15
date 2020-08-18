import React, { Fragment } from "react";
import { Avatar, Typography, Divider, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  white: {
    color: "#000",
    opacity: 0.95,
    backgroundColor: "#fff",
  },
}));

const NavHeaderEx = ({ collapsed, userData }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <div style={{ padding: collapsed ? 8 : 16, transition: "0.3s" }}>
        <Avatar
          style={{
            width: collapsed ? 48 : 60,
            height: collapsed ? 48 : 60,
            transition: "0.3s",
          }}
          className={classes.white}
        >
          {userData.userDetails.firstName.charAt(0) +
            userData.userDetails.lastName.charAt(0)}
        </Avatar>
        <div style={{ paddingBottom: 16 }} />
        {!collapsed && (
          <Fragment>
            <Typography variant={"h6"} noWrap style={{ color: "white" }}>
              {userData.userDetails.firstName +
                `\n` +
                userData.userDetails.lastName}
            </Typography>
            <Typography style={{ color: "white" }} noWrap gutterBottom>
              {userData.userDetails.email}
            </Typography>
            <Typography style={{ color: "white" }} noWrap gutterBottom>
              {userData.userRole}
            </Typography>
          </Fragment>
        )}
      </div>
      <Divider />
    </Fragment>
  );
};

export default NavHeaderEx;
