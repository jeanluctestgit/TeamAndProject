import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {tasks} from "../../fixtures/task.fixture";
import { DataContext } from "../MemberSpace/member_space.component";

export default class UserCalendar extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      
      <div  >
        <div>
          <h1>Calendar {
                 JSON.stringify(this.props.currentUser)
               }</h1>
            <pre>
               
            </pre>
      </div>
            <div className = "container" style = {{ width : 860 , height : 960}}>
            <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" 
                          events = {tasks
                            .filter((item) => item.for.includes(this.props.currentUser))
                            .map( item => {
              return {
                  title : item.title,
                  start : item.start,
                  end : item.end
              }
          })}  themeSystem = 'bootstrap'/>
            </div >
            
       
        
       
        
      </div>
    );
  }
}
