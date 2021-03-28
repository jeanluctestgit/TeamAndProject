import React, { Component } from 'react'
import { DragDropContext, DropTarget, DragSource } from "react-dnd";

const boxTarget = {
    drop(props) {
      return { name: props.status };
    }
  };
  
export default class ActivityColumn extends Component {
    render() {
        return this.props.connectDropTarget(<div>{this.props.children}</div>);   
    }
}

ActivityColumn = DropTarget("activityItem", boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))(ActivityColumn);
