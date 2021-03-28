import React, { Component } from 'react'
import { DragDropContext, DropTarget, DragSource } from "react-dnd";

const boxSource = {
    beginDrag(props) {
      return {
        name: props.id
      };
    },
  
    endDrag(props, monitor) {
      const item = monitor.getItem();
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        props.onDrop(monitor.getItem().name, dropResult.name);
      }
    }
  };

export default class UserKanbanItem extends Component {
    render() {
        return this.props.connectDragSource(<div>{this.props.children}</div>);
    }
}

UserKanbanItem = DragSource("UserKanbanItem", boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(UserKanbanItem);
