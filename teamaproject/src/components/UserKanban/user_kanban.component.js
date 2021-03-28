import React, { Component } from 'react';
import UserKanban from "./userKanban.component";
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

export default class UserKanBanWrapper extends Component {
  constructor(props) {
    super(props);
  }
    render() {
        
        return (
            <div>
              <h2>User's Kanban</h2><hr></hr>
               <DndProvider backend={HTML5Backend}>
                <UserKanban currentUser = {this.props.currentUser }/>
            </DndProvider>
          </div>
        )
    }
}
