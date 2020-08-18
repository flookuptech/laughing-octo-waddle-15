// Packages
import React, { Component, Fragment, Suspense, lazy } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import "assets/css/formstyles.css";

// Local imports
import { LoaderApp } from "components/loader";
import { getCurrentUser } from "services/auth";
import RootUserDashboard from "screens/dashboads/root/rootApp";
import ClientDashboard from "screens/dashboads/users/client/clientApp";
import AdminUserDashboard from "screens/dashboads/users/admin/adminApp";

class App extends Component {
  state = {
    user: "",
    role: "",
  };

  UNSAFE_componentWillMount() {
    try {
      const user = getCurrentUser();
      if (user) this.setState({ user, role: user.userRole });
    } catch (error) {
      return null;
    }
  }

  render() {
    const { user } = this.state;
    const Login = lazy(() => import("./screens/home/login/login"));
    const Logout = lazy(() => import("./components/logout"));

    return (
      <Fragment>
        <div className="App">
          <Router>
            <Suspense fallback={<LoaderApp />}>
              <Switch>
                <Route path="/logout" component={Logout} />
                <Route exact path="/" component={Login} />
                <Route
                  path="/dashboard/"
                  render={(props) => {
                    if (!user) return <Redirect exact to="/" />;
                    if (user.userRole === "root")
                      return (
                        <RootUserDashboard
                          roleValue={this.state.role}
                          user={this.state.user}
                          {...props}
                        />
                      );
                    if (user.userRole === "admin")
                      return (
                        <AdminUserDashboard
                          roleValue={this.state.role}
                          user={this.state.user}
                          {...props}
                        />
                      );
                    if (user.userRole === "client")
                      return (
                        <ClientDashboard
                          roleValue={this.state.role}
                          user={this.state.user}
                          {...props}
                        />
                      );
                  }}
                />
              </Switch>
            </Suspense>
          </Router>
        </div>
      </Fragment>
    );
  }
}

export default App;
