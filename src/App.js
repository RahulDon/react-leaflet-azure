import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import MapPage from "./components/map/MapPage";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/authentication/Login";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  if (localStorage.getItem("token")) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
  return <Redirect to={{ pathname: "/login" }} />;
};

function App(props) {
  const { auth } = props;
  return (
    <React.Fragment>
      {(auth.token || localStorage.getItem("token")) && <Header />}
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/map" component={MapPage} />
        <PrivateRoute exact component={PageNotFound} />
      </Switch>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.authReducer.authenticationData
  };
}

export default connect(mapStateToProps)(App);
