import React, { Fragment, Component } from "react";
import { Grid, Typography, Container, Paper, Box } from "@material-ui/core";
import HtmlTitle from "components/title";

class Account extends Component {
  render() {
    return (
      <Fragment>
        <HtmlTitle title={"Account"} />
        <Grid>
          <main className="content">
            <Container maxWidth="lg">
              <br />
              <Paper className="paper" elevation={4}>
                <Box className="boxBorder">
                  <div>
                    <Typography className="pageHeading" component="h5" variant="h5">
                      Account
                    </Typography>
                  </div>
                </Box>
              </Paper><br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default Account;
