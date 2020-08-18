import React, { Fragment, Component } from "react";
import { Grid, Typography, Container, Paper } from "@material-ui/core";
import HtmlTitle from "components/title";

class Reports extends Component {
  render() {
    return (
      <Fragment>
        <HtmlTitle title={"Reports"} />
        <Grid>
          <main className="content">
            <Container maxWidth="lg">
              <br />
              <Paper className="paper" elevation={4}>
                <div>
                  <Typography
                    className="pageHeading"
                    component="h5"
                    variant="h5"
                  >
                    REPORTS
                  </Typography>
                </div>
              </Paper>
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default Reports;
