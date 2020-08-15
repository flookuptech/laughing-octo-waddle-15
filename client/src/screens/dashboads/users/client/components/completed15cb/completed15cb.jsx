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
import {
  clientCompletedSummaryTableHead,
  clientCompletedDetailedTableHead,
} from "components/tableHead";
import Form from "components/form/form";
import HtmlTitle from "components/title";
import { getAllTransactions } from "services/getAllTransactions";

class Completed15cb extends Form {
  state = {
    allTransactionList: [],
    summary: true,
  };

  async componentDidMount() {
    try {
      const status = "complete";
      const result = await getAllTransactions(status);
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
        <HtmlTitle title={"Completed 15CB"} />
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
                    COMPLETED 15CB
                  </Typography>
                </div>
                <br />
                <Typography component="h5" variant="h6">
                  Total Number of 15CB Completed: {allTransactionList.length}
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
                    <br />
                    <Fragment>
                      {summary ? (
                        <SummaryTable
                          tableHead={clientCompletedSummaryTableHead}
                        />
                      ) : (
                        <DetailedTable
                          transactionList={allTransactionList}
                          tableHead={clientCompletedDetailedTableHead}
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

export default Completed15cb;
