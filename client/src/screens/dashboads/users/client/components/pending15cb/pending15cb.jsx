import React, { Component, Fragment } from "react";
import { Typography, Container, Grid, Paper } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PendingDetailedTable from "./pendingDetailedTable";
import { clientPendingDetailedTableHead } from "components/tableHead";
import HtmlTitle from "components/title";
import { getAllTransactionsForClient } from "services/getAllTransactions";

class Pending15cb extends Component {
  state = {
    transactionList: [],
  };

  async componentDidMount() {
    try {
      const { user } = this.props;
      const status = "pending";
      const userId = user._id;
      const result = await getAllTransactionsForClient(status, userId);
      if (result.status === 201) {
        this.setState({
          transactionList: result.data.data.transcations,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  render() {
    const { transactionList } = this.state;

    return (
      <Fragment>
        <HtmlTitle title={"Pending 15CB"} />
        <Grid>
          <ToastContainer autoClose={1500} closeButton={false} />
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
                    PENDING 15CB
                  </Typography>
                </div>
                <br />
                <Typography component="h5" variant="h6">
                  Total Number of 15CB pending: {transactionList.length}
                </Typography>
                <br />
                {transactionList.length > 0 ? (
                  <PendingDetailedTable
                    transactionList={transactionList}
                    tableHead={clientPendingDetailedTableHead}
                  />
                ) : null}
              </Paper>
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default Pending15cb;
