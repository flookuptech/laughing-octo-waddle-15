import React, { Component, Fragment } from "react";
import { Typography, Container, withStyles, Grid, Paper, Box} from "@material-ui/core";
import HtmlTitle from "components/title";
import TenantTable from "./dataFields/tenantTable";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { getAllTenants } from "services/getUsers";
import { rootTenantTableHead } from "components/tableHead";
 
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
    width: '75vw'
  },
  paper:{
    display: 'flex',
    flexDirection: "column",
    overflow: 'auto',
    padding: 32
  }
};

class UsersList extends Component {
  state = { tenantList: [] };

  async componentDidMount() {
    const { data } = await getAllTenants();
    this.setState({ tenantList: data });
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
    const { tenantList } = this.state;
    return (
      <Fragment>
        <HtmlTitle title={"Admin List"} />
        <ToastContainer autoClose={1500} closeButton={false} />
        <Grid>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <Paper className={classes.paper} elevation={4}>
                <Box className={classes.boxBorder}>
                  <div>
                    <Typography className={classes.pageHeading} component="h5" variant="h5">
                      Admin List
                    </Typography>
                  </div>
                  <br />
                  <Fragment>
                    <TenantTable tenantList={tenantList} tableHead={rootTenantTableHead} handleChange={this.handleSwitchChange} />
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

export default withStyles(styles)(UsersList);
