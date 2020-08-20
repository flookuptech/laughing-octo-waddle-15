import React, { Fragment, Component } from "react";
import { Grid, Typography, Container, Paper } from "@material-ui/core";
import HomeTable from "./homeTable";
import { adminHomeTableHead } from "components/tableHead";
import HtmlTitle from "components/title";
import "assets/css/contentStructure.css";
import { get15cbSummaryOfClients } from "services/getSummary";

class Home extends Component {
  state = { pendingTransactions: [] };

  async componentDidMount() {
    // const status = "pending";
    const pendingTransactionsOfUsers = await get15cbSummaryOfClients();
    console.log(pendingTransactionsOfUsers);
    // this.setState({
    //   pendingTransactions: pendingTransactionsOfUsers.data.data,
    // });
  }

  render() {
    const { pendingTransactions } = this.state;
    return (
      <Fragment>
        <HtmlTitle title={"Home"} />
        <Grid>
          <main className="content">
            {/* {pendingTransactions.length ? ( */}
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
                    pendingTransactions={pendingTransactions}
                  />
                </div>
                <br />
              </Paper>
              <br />
            </Container>
            {/* ) : (
              <h1>Loading....</h1>
            )} */}
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default Home;
