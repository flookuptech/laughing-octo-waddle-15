import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home/home";
import DashboardLayout from "components/drawer";
import NotFound from "components/pageNotFound";
import Account from "components/account";
import UploadInvoice from "./components/uploadInvoice";
import Pending15cb from "./components/pending15cb/pending15cb";
import Completed15cb from "./components/completed15cb/completed15cb";
import Reports from "./components/reports";

class ClientDS extends Component {
  render() {
    return (
      <DashboardLayout user={this.props.user}>
        <Switch>
          <Route path="/dashboard/uploadInvoice" component={UploadInvoice} />
          <Route path="/dashboard/pending15cb" component={Pending15cb} />
          <Route path="/dashboard/completed15cb" component={Completed15cb} />
          <Route path="/dashboard/reports" component={Reports} />
          <Route path="/dashboard/account" component={Account} />
          <Route exact path="/dashboard/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </DashboardLayout>
    );
  }
}

export default ClientDS;
