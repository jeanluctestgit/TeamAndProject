import React, { Component } from "react";
import { Container, Row, Col, Nav, Form, Button } from "react-bootstrap";
import { Switch, Route, Link, BrowserRouter, NavLink, withRouter } from "react-router-dom";
import ActivitiesDashBoard from "../ActivitiesDashBoard/activities_dashboard.component";
import UserCalendar from "../Calendar/user_calendar.component";
import DocManagement from "../GED/doc_management.component";
import Graphics from "../Graphics/graphics.component";
import Tchat from "../Tchat/Tchat.component";
import UserKanBanWrapper from "../UserKanban/user_kanban.component";
import * as Icon from 'react-bootstrap-icons';
import "./style.css";
import {tasks} from '../../fixtures/task.fixture';

export const DataContext = React.createContext({});
class MemberSpace extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks : tasks
    }
  }
  render() {
    console.log("space for :", this.props.location);
    return (
      <div>
        <pre>
          {
            JSON.stringify(this.props.location?.projectprops)
          }
        </pre>
        <DataContext.Provider value = {this.state}>
        <BrowserRouter>
          <div className = "justify-content-left" style = {{zIndex : 0}} >
            <Row>
              <Col   >
              
              <Nav className="navbar navbar-expand navbar-dark bg-dark d-none d-md-block sidebar" style = {{width : 250 , marginTop : -20 , zIndex : 0}}>
                  <Nav.Item style= {{textAlign : 'center' , marginBottom : 0}}>
                    
                    <NavLink to={"/member_space/activities"} activeClassName = "active" className="nav-link nav-link--style">
                    <Icon.Table color="white" size={24} />
                    <div>
                    Story Board
                    </div>
                      
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item style= {{textAlign : 'center', marginBottom : 0}}>
                  
                  <NavLink to={"/member_space/kanban"} activeClassName = "active" className="nav-link nav-link--style">
                  <Icon.LayoutThreeColumns color="white" size={24} />
                      <div>Kanban</div>
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item style= {{textAlign : 'center', marginBottom : 0}}>
                  
                  <NavLink to={"/member_space/calendar"} activeClassName = "active" className="nav-link nav-link--style">
                  <Icon.Calendar2Month color="white" size={24} />
                     <div> Calendar</div>
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item style= {{textAlign : 'center', marginBottom : 0}}>
                  
                  <NavLink to={"/member_space/ged"} activeClassName = "active" className="nav-link nav-link--style">
                  <Icon.FileArrowDown color="white" size={24} />
                    <div>Documents</div>
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item style= {{textAlign : 'center'}}>
                  <NavLink to={"/member_space/tchat"} activeClassName = "active" className="nav-link nav-link--style">
                  <Icon.ChatDots color="white" size={24} />
                      <div>Tchat</div>
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item style= {{textAlign : 'center'}}>
                  
                  <NavLink to={"/member_space/graphics"} activeClassName = "active" className="nav-link nav-link--style">
                  <Icon.BarChartLine color="white" size={24} />
                      <div>Graphics</div>
                    </NavLink>
                  </Nav.Item>
                </Nav>

              
                
              </Col>
              <Col xs={10} id="page-content-wrapper" style = {{marginLeft : -230}}>
                

                <Switch>
                  <Route
                    exact
                    path={["/member_space" , "/member_space/activities"]}
                    component={ActivitiesDashBoard}
                  />
                  <Route
                    exact
                    path="/member_space/kanban"
                    component={() => <UserKanBanWrapper currentUser = {this.props.location.projectprops.user }  />}
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
                    component={() => <UserCalendar currentUser = {this.props.location.projectprops.user} />}
                  />
                </Switch>
              </Col>
            </Row>
          </div>
        </BrowserRouter>

        </DataContext.Provider>
        
        
       
      </div>
    );
  }
}

export default withRouter(MemberSpace);
