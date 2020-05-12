import React, { Component, Fragment } from 'react';
import {
    Typography,
    Container,
    Box,
    withStyles,
    Grid,
    Paper
  } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import SummaryTable from './summaryTable';
import DetailedTable from './detailedTable';
import { clientCompletedSummaryTableHead, clientCompletedDetailedTableHead } from 'components/tableHead'; 
import HtmlTitle from "components/title";

const styles = {
  pageHeading: {
    fontWeight: 'bold'
  },
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    opacity: "1",
    padding: "15px"
  },
  content: {
    flexGrow: 1,
    height: "auto",
    overflow: "none",
    maxWidth: '75vw'
  },
  paper:{
    display: 'flex',
    flexDirection: "column",
    padding: 32
  }
};

class Completed15cb extends Component {
    render(){
        const { classes } = this.props;
        return(
          <Fragment>
            <HtmlTitle title={"Completed 15CB"} />
            <Grid>
              <main className={classes.content}>
                <Container maxWidth="lg">
                  <br />
                  <Paper className={classes.paper} elevation={4}>
                    <Box className={classes.boxBorder}>
                      <div>
                        <Typography className={classes.pageHeading} component="h5" variant="h5">
                          Completed 15CB
                        </Typography>
                      </div><br />
                      <div>
                        <SummaryTable tableHead={ clientCompletedSummaryTableHead } /><br /><br />
                        <DetailedTable tableHead={ clientCompletedDetailedTableHead } />
                      </div>
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

export default withStyles(styles)(Completed15cb);
