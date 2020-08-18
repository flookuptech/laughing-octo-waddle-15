import React, { Fragment, Component } from "react";
import { Grid, Typography, Container, Paper } from "@material-ui/core";
import HomeTable from "./homeTable";
import { adminHomeTableHead } from "components/tableHead";
import HtmlTitle from "components/title";
import "assets/css/contentStructure.css";
import { getTotalTransactionsOfUsers } from "services/getTotalTransactionsOfUsers";

class Home extends Component {
  state = { totalTransactions: [] };

  async componentDidMount() {
    const totalTransactions = await getTotalTransactionsOfUsers();
    console.log("totalTransactions", totalTransactions);
  }

  render() {
    const { totalTransactions } = this.state;
    return (
      <Fragment>
        <HtmlTitle title={"Home"} />
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
                    HOME
                  </Typography>
                </div>
                <br />
                <div>
                  <HomeTable
                    tableHead={adminHomeTableHead}
                    totalTransactions={totalTransactions}
                  />
                </div>
                <br />
              </Paper>
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default Home;
