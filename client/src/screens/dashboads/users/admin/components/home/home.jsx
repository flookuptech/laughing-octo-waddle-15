import React, { Fragment, Component } from "react";
import { Grid, Typography, Container, Paper, Box} from "@material-ui/core";
import HomeTable from './homeTable';
import { getUsers } from "services/getUsers";
import { adminHomeTableHead } from 'components/tableHead'; 
import HtmlTitle from "components/title";
import "assets/css/contentStructure.css";

class Home extends Component {
  state = { clientsList: [] };

  async componentDidMount() {
    const db = this.props.user.orgDatabase;
    const { data: clientsList } = await getUsers(db);
    this.setState({ clientsList });
  }

  render() {
    const { clientsList } = this.state;
    return (
      <Fragment>
        <HtmlTitle title={"Home"} />
        <Grid>
          <main className="content">
            <Container maxWidth="lg">
              <br />
              <Paper className="paper" elevation={4}>
                <Box className="boxBorder">
                  <div>
                    <Typography className="pageHeading" component="h5" variant="h5">
                      Home Page
                    </Typography>
                  </div><br />
                  <div>
                      <HomeTable tableHead={adminHomeTableHead} clientsList={clientsList} />
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

export default Home;
