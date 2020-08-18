import React, { Component, Fragment } from "react";
import { Typography, Container, Box, Grid, Paper } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { getUsers } from "services/getUsers";
import { ToastContainer, toast } from "react-toastify";
import UserTable from "./clientTable";
import HtmlTitle from "components/title";
import { clientList } from "components/tableHead";

class UsersList extends Component {
  state = { clientsList: [] };

  async componentDidMount() {
    const result = await getUsers();
    this.setState({ clientsList: result.data.data.users });
    console.log(result.data.data.users);
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
    const { clientsList } = this.state;
    return (
      <Fragment>
        <HtmlTitle title={"Client List"} />
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
                    CLIENT LIST
                  </Typography>
                </div>
                <br />
                <div>
                  <UserTable
                    clientsList={clientsList}
                    tableHead={clientList}
                    handleChange={this.handleSwitchChange}
                  />
                </div>
                <br />
              </Paper>
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default UsersList;
