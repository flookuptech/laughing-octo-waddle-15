import React, { Component, Fragment } from "react";
import {
  Typography,
  Container,
  Box,
  withStyles,
  Grid
} from "@material-ui/core";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { getUsers } from "services/getUsers";
import UserTable from "components/table";

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
  state = { clientsList: [] };

  async componentDidMount() {
    const db = this.props.user.orgDatabase;
    const { data: clientsList } = await getUsers(db);
    this.setState({ clientsList });
  }

  render() {
    const { classes } = this.props;
    const { clientsList } = this.state;
    return (
      <Fragment>
        <ToastContainer autoClose={1500} closeButton={false} />
        <Grid>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <div>
                <Typography component="h5" variant="h5">
                  Clients list
                </Typography>
              </div>
              <br />
              <Fragment>
                <UserTable clientsList={clientsList} />
              </Fragment>
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(UsersList);
