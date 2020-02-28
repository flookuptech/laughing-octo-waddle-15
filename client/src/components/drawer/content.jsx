import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = ({ breakpoints }) => ({
  root: {
    display: "flex"
  },
  paper: {
    // padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
});

const ContentForm = ({ classes, data, onChangeData, children }) => {
  const handleChange = key => e =>
    onChangeData({
      ...data,
      [key]: e.target.checked
    });
  return (
    <div className={classes.root}>
      <Paper elevation={1} square className={classes.paper}>
        <Grid container>
          <Grid item>
            <FormControl component="fieldset">
              <FormLabel component="legend">{children}</FormLabel>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

ContentForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  preset: PropTypes.string.isRequired,
  onChangePreset: PropTypes.func.isRequired,
  data: PropTypes.shape({}).isRequired,
  onChangeData: PropTypes.func.isRequired
};
ContentForm.defaultProps = {};

export default withStyles(styles)(ContentForm);
