import React, { Component } from "react";
import { Container, Row, Col, Nav, Form, Button } from "react-bootstrap";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import ActivitiesDashBoard from "../ActivitiesDashBoard/activities_dashboard.component";
import UserCalendar from "../Calendar/user_calendar.component";
import DocManagement from "../GED/doc_management.component";
import Graphics from "../Graphics/graphics.component";
import Tchat from "../Tchat/Tchat.component";
import UserKanBan from "../UserKanban/user_kanban.component";
import * as Icon from 'react-bootstrap-icons';


export default class MemberSpace extends Component {
  render() {
    console.log("space for :", this.props.location.projectprops);
    return (
      <div>
        <BrowserRouter>
          <div className = "justify-content-left" >
            <Row>
              <Col   >
              
              <Nav className="navbar navbar-expand navbar-dark bg-dark d-none d-md-block sidebar" style = {{width : 250 , marginTop : -20}}>
                  <Nav.Item style= {{textAlign : 'center'}}>
                    <Icon.Table color="white" size={24} />
                    <Link to={"/member_space/activities"} className="nav-link">
                      Activities
                    </Link>
                  </Nav.Item>
                  <Nav.Item style= {{textAlign : 'center'}}>
                  <Icon.LayoutThreeColumns color="white" size={24} />
                  <Link to={"/member_space/kanban"} className="nav-link">
                      Kanban
                    </Link>
                  </Nav.Item>
                  <Nav.Item style= {{textAlign : 'center'}}>
                  <Icon.Calendar2Month color="white" size={24} />
                  <Link to={"/member_space/calendar"} className="nav-link">
                      Calendar
                    </Link>
                  </Nav.Item>
                  <Nav.Item style= {{textAlign : 'center'}}>
                  <Icon.File color="white" size={24} />
                  <Link to={"/member_space/ged"} className="nav-link">
                      Documents
                    </Link>
                  </Nav.Item>
                  <Nav.Item style= {{textAlign : 'center'}}>
                  <Icon.ChatDots color="white" size={24} />
                  <Link to={"/member_space/tchat"} className="nav-link">
                      Tchat
                    </Link>
                  </Nav.Item>
                  <Nav.Item style= {{textAlign : 'center'}}>
                  <Icon.BarChartLine color="white" size={24} />
                  <Link to={"/member_space/graphics"} className="nav-link">
                      Graphics
                    </Link>
                  </Nav.Item>
                </Nav>

              
                
              </Col>
              <Col xs={10} id="page-content-wrapper" style = {{marginLeft : -230}}>
                <pre>
                  {JSON.stringify(this.props.location.projectprops, null, " ")}
                </pre>

                <Switch>
                  <Route
                    exact
                    path="/member_space/activities"
                    component={ActivitiesDashBoard}
                  />
                  <Route
                    exact
                    path="/member_space/kanban"
                    component={UserKanBan}
                  />
                  <Route
                    exact
                    path="/member_space/ged"
                    component={DocManagement}
                  />
                  <Route
                    exact
                    path="/member_space/tchat"
                    component={Tchat}
                  />
                  <Route
                    exact
                    path="/member_space/graphics"
                    component={Graphics}
                  />
                   <Route
                    exact
                    path="/member_space/calendar"
                    component={UserCalendar}
                  />
                </Switch>
              </Col>
            </Row>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
