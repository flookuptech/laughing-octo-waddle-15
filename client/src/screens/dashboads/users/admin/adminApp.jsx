import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home/home";
import UsersList from "./components/clientsList/clientsList";
import NotFound from "components/pageNotFound";
import DashboardLayout from "components/drawer";
import Account from "components/account";
import AddUsers from "./components/addClients";
import Completed15cb from "./components/completed15cb/completed15cb";
import Completed15cbDetails from "./components/completed15cb/15cbDetails";
import Pending15cb from "./components/pending15cb/pending15cb";
import Pending15cbDetails from "./components/pending15cb/15cbDetails";

class AdminUserDS extends Component {
  render() {
    const { user } = this.props;
    return (
      <DashboardLayout user={user}>
        <Switch>
          <Route
            path="/dashboard/addUsers"
            render={(props) => <AddUsers user={user} {...props} />}
          />
          <Route
            path="/dashboard/usersList"
            render={(props) => <UsersList user={user} {...props} />}
          />
          <Route exact path="/dashboard/account" component={Account} />
          <Route
            exact
            path="/dashboard/"
            render={(props) => <Home user={user} {...props} />}
          />
          <Route
            exact
            path="/dashboard/completed15CB"
            render={(props) => <Completed15cb user={user} {...props} />}
          />
          <Route exact path="/dashboard/pending15CB" component={Pending15cb} />
          <Route
            path="/dashboard/pending15CB/:id"
            component={Pending15cbDetails}
          />
          <Route
            path="/dashboard/completed15CB/:id"
            render={(props) => <Completed15cbDetails user={user} {...props} />}
          />
          <Route component={NotFound} />
        </Switch>
      </DashboardLayout>
    );
  }
}

export default AdminUserDS;
