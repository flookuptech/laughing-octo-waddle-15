import React, { Fragment } from "react";
import {
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryTable from "./summaryTable";
import DetailedTable from "./detailedTable";
import HtmlTitle from "components/title";
import Form from "components/form/form";
import {
  adminPendingDetailedTableHead,
  adminPendingSummaryTableHead,
} from "components/tableHead";
import { getAllTransactions } from "services/getAllTransactions";
import { get15cbSummaryOfClients } from "services/getSummary";

class Pending15cb extends Form {
  state = {
    summaryTransactions: [],
    allTransactionList: [],
    summary: true,
  };

  async componentDidMount() {
    try {
      const status = "pending";
      const summary = await get15cbSummaryOfClients(status);
      if (summary.status === 200) {
        this.setState({
          summaryTransactions: summary.data.data,
        });
      }
      const result = await getAllTransactions(status);
      if (result.status === 201) {
        this.setState({
          allTransactionList: result.data.data.transcations,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  handleViewChange = () => {
    this.setState({ summary: true });
  };

  handleViewChangeDetail = () => {
    this.setState({ summary: false });
  };

  render() {
    const { summary, allTransactionList, summaryTransactions } = this.state;
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
                  Total Number of 15CB pending: {allTransactionList.length}
                </Typography>
                <br />
                {allTransactionList.length > 0 ? (
                  <Fragment>
                    <div className="button-align">
                      <ButtonGroup variant="contained">
                        <Button
                          onClick={this.handleViewChange}
                          className={
                            summary ? "selectedButton" : "button-background"
                          }
                        >
                          Summary
                        </Button>
                        <Button
                          onClick={this.handleViewChangeDetail}
                          className={
                            !summary ? "selectedButton" : "button-background"
                          }
                        >
                          Detailed
                        </Button>
                      </ButtonGroup>
                    </div>
                    <br />
                    <Fragment>
                      {summary ? (
                        <SummaryTable
                          transactionList={summaryTransactions}
                          tableHead={adminPendingSummaryTableHead}
                        />
                      ) : (
                        <DetailedTable
                          transactionList={allTransactionList}
                          tableHead={adminPendingDetailedTableHead}
                          onSubmit={this.handleSubmit}
                          onChange={this.handleOnChange}
                        />
                      )}
                    </Fragment>
                  </Fragment>
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
