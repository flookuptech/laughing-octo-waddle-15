import React, { Component, Fragment } from "react";
import {
  Typography,
  Container,
  Box,
  withStyles,
  Grid,
  Paper
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { getUsers } from "services/getUsers";
import { ToastContainer, toast } from "react-toastify";
import UserTable from "./clientTable";
import HtmlTitle from "components/title";
import { clientList } from 'components/tableHead'; 


const styles = {
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    padding: "25px"
  },
  content: {
    flexGrow: 1,
    overflow: "none",
    width: '75vw'
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: 32
  },
  pageHeading: {
    fontWeight: 'bold'
  }
};

class UsersList extends Component {
  state = { clientsList: [] };

  async componentDidMount() {
    const db = this.props.user.orgDatabase;
    const { data: clientsList } = await getUsers(db);
    this.setState({ clientsList });
  }

  // handleSwitchChange = async (e) => {
  //   const { clientsList } = this.state;
  //   const index = userList.findIndex((user) => user._id === e._id);
  //   userList[index].status = !userList[index].status;
  //   this.setState({ userList }, () => {
  //     this.changeUserStatus(e);
  //   });
  // };
  
  // changeUserStatus = async (user) => {
  //   try {
  //     const { data } = await changeUserStatus(user);
  //     toast.success(data.msg);
  //   } catch (error) {
  //     toast.error("Failed to change user status");
  //   }
  // };

  render() {
    const { classes } = this.props;
    const { clientsList } = this.state;
    return (
      <Fragment>
        <HtmlTitle title={"Client List"} />
        <Grid>
          <ToastContainer autoClose={1500} closeButton={false} />
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <Paper className={classes.paper}>
                <Box className={classes.boxBorder}>
                  <div>
                    <Typography className={classes.pageHeading} component="h5" variant="h5">
                      Client List
                    </Typography>
                  </div><br />
                  <div>
                    <UserTable clientsList={clientsList} tableHead={clientList} handleChange={this.handleSwitchChange} />
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

export default withStyles(styles)(UsersList);
