import React from "react";
import { lighten, makeStyles, withStyles, Grid } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles({
  root: {
    height: 30,
    backgroundColor: lighten("#009933", 0.8),
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#009933",
  },
})(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export function LinearBar({ total, completed }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item>
          <label>
            <b>Completed</b>
            <br />
            {completed}
          </label>
        </Grid>
        <Grid item>
          <label>
            <b>Pending</b>
            <br />
            {total - completed}
          </label>
        </Grid>
      </Grid>
      <BorderLinearProgress
        className={classes.margin}
        variant="determinate"
        color="secondary"
        value={(completed / total) * 100}
      />
      <label style={{ zIndex: 90000 }}>
        <b>Total 15CB submitted:</b>&nbsp;{total}
      </label>
    </div>
  );
}
