import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";
import AuthService from "./services/auth.service";

import Login from "./components/Authentication/login.component";
import Register from "./components/Authentication/register.component";
import Home from "./components/Home/home.component";
import MemberSpace from './components/MemberSpace/member_space.component';





class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      isUserAuthenticated: false
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    window.addEventListener('beforeunload', this.handleLeavePage);
    console.log(user)
    if (user) {
      this.setState({
        currentUser: user[0],
        isUserAuthenticated: true
      });
    }
  }

  

  


  

  handleLeavePage = (e) => {

  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
      isUserAuthenticated: false
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Team & Project
          </Link>
          {currentUser && this.state.isUserAuthenticated ? (
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
            <Route
              exact
              path="/"
              render={() => {
                const user = AuthService.getCurrentUser();

                return (
                  user ?
                    <Redirect to="/home" /> :
                    <Redirect to="/login" />
                )
              }}
            />
            <Route exact path={"/login"} component={Login} />

            <Route exact path="/register" component={Register} />
            <Route exact path={"/home"} component={() => <Home user={currentUser} />} />

            <Route path="/member_space" component={MemberSpace} />

          </Switch>
        </div>

      </div>
    );
  }
}

export default App;
