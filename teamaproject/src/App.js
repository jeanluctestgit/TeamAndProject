import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import AuthService from "./services/auth.service";

import Login from "./components/Authentication/login.component";
import Register from "./components/Authentication/register.component";
import Home from "./components/Home/home.component";
import MemberSpace from './components/MemberSpace/member_space.component';
import ActivitiesDashBoard from './components/ActivitiesDashBoard/activities_dashboard.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log(user)
    if (user) {
      this.setState({
        currentUser: user[0],
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Team & Project
          </Link>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="mt-3" style={{ height: 400 }}>
          <Switch>
          <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path={["/", "/home"]} component={() => <Home user = { currentUser } />} /> 
            <Route exact path="/member_space" component={MemberSpace} />
            
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
