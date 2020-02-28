import React, { Fragment } from "react";
import { Grid, Typography, Container, withStyles } from "@material-ui/core";

import Form from "components/form/form";
import HtmlTitle from "components/title";

const styles = {
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    opacity: "1",
    padding: "15px"
  },
  content: {
    flexGrow: 1,
    overflow: "auto"
  }
};

class UploadInvoice extends Form {
  state = {
    data: {}
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <HtmlTitle title="Reports" />
        <Grid>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <Typography component="h5" variant="h5">
                Reports
              </Typography>
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(UploadInvoice);
