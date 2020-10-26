import React, { Fragment, Component } from "react";
import { Grid, Typography, Container, Paper } from "@material-ui/core";
import HomeTable from "./homeTable";
import { adminHomeTableHead } from "components/tableHead";
import HtmlTitle from "components/title";
import "assets/css/contentStructure.css";
import { getTotalTransactionsOfUsers } from "services/getTotalTransactionsOfUsers";
import { get15cbSummaryForClient } from "../../../../../../services/getSummary";

const calculateCompletedTransactions = async (totalTransactions) => {
  const promises = totalTransactions.map(async (item, i) => {
    const completed = await get15cbSummaryForClient(item.userId);
    return {
      ...item,
      complete:
        completed.data.results > 0 ? completed.data.data[i].complete : 0,
    };
  });

  return await Promise.all(promises);
};

class Home extends Component {
  state = { totalTransactions: [] };

  async componentDidMount() {
    const totalTransactionsOfUsers = await getTotalTransactionsOfUsers();
    this.setState({ totalTransactions: totalTransactionsOfUsers.data.data });
    const newTotalTransactions = await calculateCompletedTransactions(
      this.state.totalTransactions
    );
    this.setState({ totalTransactions: newTotalTransactions });
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
                {totalTransactions.length > 0 ? (
                  <HomeTable
                    tableHead={adminHomeTableHead}
                    totalTransactions={totalTransactions}
                  />
                ) : (
                  <Typography variant="h6" component="h6">
                    No Users have submitted 15CB yet
                  </Typography>
                )}
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
