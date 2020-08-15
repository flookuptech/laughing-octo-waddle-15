import React, { Fragment } from "react";
import {
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import SummaryTable from "./summaryTable";
import DetailedTable from "./detailedTable";
import { adminPendingSummaryTableHead } from "components/tableHead";
import HtmlTitle from "components/title";
import Form from "components/form/form";
import { adminPendingDetailedTableHead } from "components/tableHead";
import { getAllTransactions } from "services/getAllTransactions";

class Pending15cb extends Form {
  state = {
    allTransactionList: [],
    summary: true,
  };

  async componentDidMount() {
    try {
      const status = "pending";
      const result = await getAllTransactions(status);
      console.log(result);
      if (result.status === 201) {
        this.setState({
          allTransactionList: result.data.data.transcations,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleViewChange = () => {
    this.setState({ summary: true });
  };

  handleViewChangeDetail = () => {
    this.setState({ summary: false });
  };

  render() {
    const { summary, allTransactionList } = this.state;
    return (
      <Fragment>
        <HtmlTitle title={"Pending 15CB"} />
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
                    PENDING 15CB
                  </Typography>
                </div>
                <br />
                <Typography component="h5" variant="h6">
                  Total Number of 15CB pending: {allTransactionList.length}
                </Typography>
                {allTransactionList.length > 0 ? (
                  <Fragment>
                    <br />
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
                    <br />
                    <Fragment>
                      {summary ? (
                        <SummaryTable
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
                    <br />
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
