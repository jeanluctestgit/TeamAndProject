import React, { Component } from 'react'
import Activities from "./activities.component";
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { DataContext } from "../MemberSpace/member_space.component";

export default class ActivitiesDashBoard extends Component {
    render() {
        return (
          <div>
              <h2>Story Board</h2><hr></hr>
               <DndProvider backend={HTML5Backend}>
               <DataContext.Consumer >
                {
                  value => {
                    return (
                      <Activities tasks = { value.tasks }/>
                    )
                  }
                }
                 
               </DataContext.Consumer>
                      
                  
             
            </DndProvider>
          </div>
            
        )
    }
}
