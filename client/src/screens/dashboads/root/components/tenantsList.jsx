import React, { Component, Fragment } from "react";
import {
  Typography,
  Container,
  Box,
  withStyles,
  Grid
} from "@material-ui/core";
import TenantTable from "./tenantTable";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { getAllTenants } from "services/getUsers";

const styles = {
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    opacity: "1",
    padding: "15px"
  },
  content: {
    flexGrow: 1,
    overflow: "auto"
  }
};

class UsersList extends Component {
  state = { tenantList: [] };

  async componentDidMount() {
    const { data } = await getAllTenants();
    this.setState({ tenantList: data });
  }

  render() {
    const { classes } = this.props;
    const { tenantList } = this.state;
    return (
      <Fragment>
        <ToastContainer autoClose={1500} closeButton={false} />
        <Grid>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <Box className={classes.boxBorder}>
                <div>
                  <Typography component="h5" variant="h5">
                    Users list
                  </Typography>
                </div>
                <br />
                <Fragment>
                  <TenantTable tenantList={tenantList} />
                </Fragment>
              </Box>
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(UsersList);
