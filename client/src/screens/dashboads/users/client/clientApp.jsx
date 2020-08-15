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
import Completed15cbDetails from "./components/completed15cb/15cbDetails";

class ClientDS extends Component {
  render() {
    const { user } = this.props;
    return (
      <DashboardLayout user={user}>
        <Switch>
          <Route
            path="/dashboard/uploadInvoice"
            render={(props) => <UploadInvoice user={user} {...props} />}
          />
          <Route
            path="/dashboard/pending15cb"
            render={(props) => <Pending15cb user={user} {...props} />}
          />
          <Route
            path="/dashboard/completed15cb"
            render={(props) => <Completed15cb user={user} {...props} />}
          />
          <Route path="/dashboard/reports" component={Reports} />
          <Route path="/dashboard/account" component={Account} />
          <Route exact path="/dashboard/" component={Home} />
          <Route
            path="/dashboard/completedTransaction/:id"
            component={Completed15cbDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </DashboardLayout>
    );
  }
}

export default ClientDS;
