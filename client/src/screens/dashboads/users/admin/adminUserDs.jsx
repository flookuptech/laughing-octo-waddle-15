import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/home";
import UsersList from "./components/clientsList";
import NotFound from "components/pageNotFound";
import DashboardLayout from "components/drawer";
import EditProfile from "components/editProfile";
import AddUsers from "./components/addUsers/addUsers";

class AdminUserDS extends Component {
  render() {
    const { user } = this.props;
    return (
      <DashboardLayout user={user}>
        <Switch>
          <Route
            path="/dashboard/addUsers"
            render={props => <AddUsers user={user} {...props} />}
          />
          <Route
            path="/dashboard/usersList"
            render={props => <UsersList user={user} {...props} />}
          />
          <Route exact path="/editprofile" component={EditProfile} />
          <Route exact path="/dashboard/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </DashboardLayout>
    );
  }
}

export default AdminUserDS;
