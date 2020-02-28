import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";

import Home from "./components/home";
import Account from "components/account";
import Reports from "./components/reports";
import NotFound from "components/pageNotFound";
import DashboardLayout from "components/drawer";
import TenantsList from "./components/tenantsList";
import Organizations from "./components/createAdmins";

class AdminDashBoard extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <DashboardLayout user={user}>
        <Switch>
          <Route path="/dashboard/account" component={Account} />
          <Route path="/dashboard/reports" component={Reports} />
          <Route path="/dashboard/organizations" component={Organizations} />
          <Route
            path="/dashboard/tenantsList"
            render={props => <TenantsList user={user} {...props} />}
          />
          <Route exact path="/dashboard/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </DashboardLayout>
    );
  }
}

export default AdminDashBoard;
