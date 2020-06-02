import React, { Component, Fragment } from 'react';
import {
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import SummaryTable from './summaryTable';
import DetailedTable from './detailedTable';
import {adminPendingSummaryTableHead } from 'components/tableHead';
import HtmlTitle from "components/title";
import Form from "components/form/form";
import {adminDetailedTableHead} from 'components/tableHead';

class Pending15cb extends Form {
  state = {
    data: {},
    summary: true
  }

  handleViewChange = () => {
    this.setState({ summary: true });
  };

  handleViewChangeDetail = () => {
    this.setState({ summary: false });
  };

  render(){
    const{ summary } = this.state;
    return(
      <Fragment>
        <HtmlTitle title={"Pending 15CB"} />
        <Grid>
          <main className="content">
            <Container maxWidth="lg">
              <br />
              <Paper className="paper" elevation={4}>
                <Box className="boxBorder">
                  <div>
                    <Typography className="pageHeading" component="h5" variant="h5">
                      Pending 15CB
                    </Typography>
                  </div><br />
                  <div className="button-align">
                    <ButtonGroup
                      variant="contained"
                    >
                      <Button
                        onClick={this.handleViewChange}
                        className={summary ? 'selectedButton' : 'button-background'}
                      >
                        Summary
                      </Button>
                      <Button
                        onClick={this.handleViewChangeDetail}
                        className={!summary ? 'selectedButton' : 'button-background'}
                      >
                        All Transcations
                      </Button>
                    </ButtonGroup>
                  </div><br /><br />
                  <Fragment>
                    {summary ? 
                      <SummaryTable tableHead={adminPendingSummaryTableHead} /> :
                      <DetailedTable 
                        tableHead={adminDetailedTableHead}
                        onSubmit={this.handleSubmit}
                        onChange={this.handleOnChange}/>
                    }
                  </Fragment>
                  <br />
                </Box>
              </Paper><br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default Pending15cb;
