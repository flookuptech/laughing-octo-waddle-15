import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/home";
import DashboardLayout from "components/drawer";
import NotFound from "components/pageNotFound";
import Account from "components/account";
import UploadInvoice from "./components/uploadInvoice";

class ClientDS extends Component {
  render() {
    return (
      <DashboardLayout user={this.props.user}>
        <Switch>
          <Route path="/dashboard/uploadInvoice" component={UploadInvoice} />
          <Route path="/dashboard/account" component={Account} />
          <Route exact path="/dashboard/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </DashboardLayout>
    );
  }
}

export default ClientDS;
