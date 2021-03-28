import React, { Component } from "react";
import { Button, Col, Form, ListGroup, Modal, Row } from "react-bootstrap";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext, DropTarget, DragSource } from "react-dnd";
import UserKanbanColumn from "./userKanbanColumn.component";
import UserKanbanItem from "./userKanbanItem.component";
import UserTaskCard from "./userTaskCard.component";
import update from "immutability-helper";
import Moment from "react-moment";
import moment from "moment";
import Avatar, { ConfigProvider } from "react-avatar";
import * as Icon from 'react-bootstrap-icons';
import "./style.css";
import { tasks , channels , labelsMap , users , status} from "../../fixtures/task.fixture";



const classes = {
  board: {
    display: "flex",
    margin: "0 auto",
    width: "78vw",
    height: "80vh",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    overflow: "auto",
  },
  column: {
    minWidth: 150,
    width: "24vw",
    height: "78vh",
    margin: "0 auto",
    backgroundColor: "#ECECEC",
    marginLeft: 5,
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    color: "white",
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: "0.8em",
    cursor: "pointer",
    backgroundColor: "yellow",
  },
};

class UserKanban extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks,
      show: false,
      showTask: false,
      updateTask: false,
      selectedTaskId: 0,
      selectedCollab: [],
      selectedUser: "",
      selectedTaskName: "",
      selectedTaskDescription: "",
      selectedTaskCategory: "",
      selectedDateStart: "",
      selectedDateEnd: "",
      selectedStatus:""
    };
    this.collabRef = React.createRef();
  }

  componentDidMount() {

    //alert(this.props.currentUser);
  }

  update = (id, status) => {
    const { tasks } = this.state;
    const task = tasks.find((task) => task._id === id);
    task.status = status;
    const taskIndex = tasks.indexOf(task);
    const newTasks = update(tasks, {
      [taskIndex]: { $set: task },
    });
    this.setState({ tasks: newTasks });
  };

  handleChangeCollab = (e) => {
    this.setState({
      selectedUser: e.target.value,
    });
  };

  handleTaskDescriptionChange = (e) => {
    this.setState({
      selectedTaskDescription: e.target.value,
    });
  };

  handleStartChange = (e) => {
    this.setState({
        selectedDateStart: e.target.value,
      });
  }

  handleEndChange = (e) => {
    this.setState({
        selectedDateEnd: e.target.value,
      });
  }

  handleTaskNameChange = (e) => {
    this.setState({
      selectedTaskName: e.target.value,
    });
  };

  handleTaskCategoryChange = (e) => {
    this.setState({
      selectedTaskCategory: e.target.value,
    });
  };

  handleAddCollaborator = (event) => {
    let { tasks, selectedCollab, selectedUser, selectedTaskId } = this.state;
    selectedCollab = this.state.updateTask ? selectedCollab : selectedCollab;
    selectedCollab.push(this.collabRef.current.value);
    /*if (this.state.updateTask) {
      let task = tasks.find((t) => t._id === selectedTaskId);
      let index  = tasks.indexOf(task);
      tasks[index].for.push(this.collabRef.current.value);

      this.setState({ tasks });
    }*/

    this.setState({ selectedCollab });
  };

  handleDeleteCollaborator = (event, selectcollab) => {
    let { selectedCollab } = this.state;
    let user = selectcollab;

    selectedCollab = selectedCollab.filter((c) => c !== user);
    this.setState({ selectedCollab });
  };

  handleDeleteTask = (e, id) => {
    let { tasks } = this.state;
    tasks = tasks.filter((task) => task._id !== id);
    this.setState({ tasks });
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  handleSaveChannel = (event) => {
    event.preventDefault();
    let tname = new FormData(event.target);
    channels = [...channels, tname.get("Channel")];
    labelsMap[tname.get("Channel")] = tname.get("Channel");
    this.setState({ show: false });
  };

  handleCloseTask = () => this.setState({ showTask: false });
  handleShowTask = (event, id) => {
    let {
      selectedTaskName,
      selectedTaskDescription,
      selectedTaskCategory,
      selectedCollab,
      selectedDateStart,
      selectedDateEnd,
      selectedStatus
    } = this.state;
    this.setState({
      showTask: true,
      updateTask: event.type === "dblclick",
      selectedTaskId: id,
    });
    console.log(this.state.updateTask);
    selectedTaskName =
      event.type === "dblclick"
        ? this.state.tasks.find((t) => t._id === id).title
        : "";
    selectedTaskDescription =
      event.type === "dblclick"
        ? this.state.tasks.find((t) => t._id === id).description
        : "";
        selectedStatus =
        event.type === "dblclick"
          ? this.state.tasks.find((t) => t._id === id).status
          : "";
    selectedDateStart =
      event.type === "dblclick"
        ? this.state.tasks.find((t) => t._id === id).start
        : "";
    selectedDateEnd =
      event.type === "dblclick"
        ? this.state.tasks.find((t) => t._id === id).end
        : "";
    selectedTaskCategory =
      event.type === "dblclick"
        ? this.state.tasks.find((t) => t._id === id).category
        : "";
    selectedCollab =
      event.type === "dblclick"
        ? this.state.tasks.find((t) => t._id === id).for
        : [];
    console.log("------------------> ", selectedTaskName);
    this.setState({
      selectedTaskName,
      selectedTaskDescription,
      selectedTaskCategory,
      selectedCollab,
      selectedDateStart,
      selectedDateEnd,
      selectedStatus
    });
  };
  handleSaveTask = (event, id) => {
    event.preventDefault();

    let tname = new FormData(event.target);
    let { tasks, selectedCollab } = this.state;
    let task = {};
    let newTasks = null;
    if (!this.state.updateTask) {
      console.log("add task");
      task._id = tasks.length + 1;
      task.title = tname.get("Task");
      task.category = tname.get("Category");
      task.description = tname.get("Description");
      task.status = tname.get("Status");
      task.start = tname.get("Start");
      task.end = tname.get("End");
      task.for = this.state.selectedCollab;
      newTasks = update(tasks, { $push: [task] });
    } else {
      console.log(this.state.selectedTaskId);
      task = tasks.find((t) => t._id === this.state.selectedTaskId);
      console.log(task, this.state.selectedTaskId);
      task.title = tname.get("Task");
      task.category = tname.get("Category");
      task.description = tname.get("Description");
      task.status = tname.get("Status");
      task.start = tname.get("Start");
      task.end = tname.get("End");
      task.for = this.state.selectedCollab;
      const taskIndex = tasks.indexOf(task);
      newTasks = update(tasks, {
        [taskIndex]: { $set: task },
      });
    }

    console.log(newTasks);
    this.setState({ tasks: newTasks });
    console.log(tasks);
    this.setState({ showTask: false });
  };

  render() {
    const { tasks } = this.state;

    const { show, showTask } = this.state;

    return (
      
      <main style={{ fontSize: 12 }}>
        <pre>
          {
            JSON.stringify(this.props.currentUser)
          }
        </pre>
        <section style={classes.board}>
          {status.map((value) => (
            <UserKanbanColumn status={value}>
              <div className="card md-2 " style={classes.column}>
                <div className="card-header bg-dark" style={classes.columnHead}>
                  {value}
                  
                </div>
                <div style = {{ height : "77vh"}}>
                  <div style={{ width: "18vw" , margin: "0 auto" }}>
                   
                    <Modal
                      show={showTask}
                      onHide={this.handleCloseTask}
                      
                      
                    >
                      <Modal.Header className="primary" style = {{ backgroundColor : '#559dc9' , color : 'white'}} closeButton>
                        <Modal.Title>Task</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form id="TaskForm" onSubmit={this.handleSaveTask}>
                          <Form.Group controlId="formChannel">
                            <Row>
                              <Col>
                              <Form.Label>Channel</Form.Label>
                            <Form.Text
                              
                              name="Category"
                              
                            >
                            {this.state.selectedTaskCategory}
                            </Form.Text>
                              </Col>
                              <Col>
                              <Form.Label>Task</Form.Label>
                            <Form.Text
                              
                              name="Task"
                            >
                            {this.state.selectedTaskName}
                            </Form.Text>
                              </Col>
                              <Col>
                              <Form.Label>Status</Form.Label>
                            <Form.Text>
                              {this.state.selectedStatus}
                            </Form.Text>  
                              </Col>
                            </Row>
                            
                            
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="Description"
                              placeholder="Enter description"
                              value={this.state.selectedTaskDescription}
                              onChange={this.handleTaskDescriptionChange}
                              readOnly={true}
                            />
                            
                            
                            <Row>
                              <Col>
                                <Form.Label>Start</Form.Label>
                                <Form.Control
                                  type="Date"
                                  name="Start"
                                  value = {this.state.selectedDateStart}
                                  onChange = {this.handleStartChange}
                                  readOnly={true}
                                />
                              </Col>
                              <Col>
                                <Form.Label>End</Form.Label>
                                <Form.Control
                                  type="Date"
                                  name="End"
                                  value={this.state.selectedDateEnd}
                                  readOnly={true}
                                  onChange = {this.handleEndChange }
                                />
                              </Col>
                            </Row>
                         
                          </Form.Group>
                           <div className = "float-right">
                           <Button
                            variant="secondary"
                            onClick={this.handleCloseTask}
                            className = "mr-1"
                          >
                            Close
                          </Button>
                          <Button variant="primary" type="submit">
                            Save Changes
                          </Button>
                          </div>
                          
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </div>
                  <div style={{ height: "92%", overflowY: "auto" }}>
                    {tasks
                     .filter((item) => item.for.includes(this.props.currentUser))
                      .filter((item) => item.status === value)
                      .map((item) => (
                        <UserKanbanItem id={item._id} onDrop={this.update}>
                          <UserTaskCard
                            item={item}
                            onDblClick={(e) => this.handleShowTask(e, item._id)}
                          />
                        </UserKanbanItem>
                      ))}
                  </div>
                </div>
              </div>
            </UserKanbanColumn>
          ))}
         
        </section>
      </main>
    );
  }
}
export default UserKanban;
