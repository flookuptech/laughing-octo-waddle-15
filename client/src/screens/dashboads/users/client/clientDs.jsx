import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";

import Home from "./components/home";
import DashboardLayout from "components/drawer";
import TestDashboardLayout from "components/testDrawer";
import NotFound from "components/pageNotFound";
import EditProfile from "components/editProfile";
import UploadInvoice from "./components/uploadInvoice";

class ClientDS extends Component {
  state = {};
  render() {
    return (
      <TestDashboardLayout user={this.props.user}>
        <Switch>
          <Route path="/dashboard/uploadInvoice" component={UploadInvoice} />
          <Route path="/dashboard/editprofile" component={EditProfile} />
          <Route exact path="/dashboard/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </TestDashboardLayout>
    );
  }
}

export default ClientDS;
