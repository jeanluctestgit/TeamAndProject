import React, { Component } from "react";
import {
  Form,
  Table,
  Button,
  Col,
  ListGroupItem,
  ListGroup,
} from "react-bootstrap";
import { Switch, Route, Link } from "react-router-dom";
import user from "../../fixtures/user.fixture";
import project from "../../fixtures/project.fixture";
import update from "immutability-helper";
import MemberSpace from "../MemberSpace/member_space.component";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleAddCollaborator = this.handleAddCollaborator.bind(this);
    this.handleSelectCollaborator = this.handleSelectCollaborator.bind(this);
    this.handleDeSelectCollaborator = this.handleDeSelectCollaborator.bind(this);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeProjectDescription = this.onChangeProjectDescription.bind(
      this
    );
    this.handleSaveProject = this.handleSaveProject.bind(this);
    this.handleUpdateProject = this.handleUpdateProject.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);

    this.state = {
      projects: [],
      users: [],
      collaborators: [],
      selectedCollab: "",
      projectName: "",
      projectDescription: "",
      currentUser: "",
      updateData: false,
    };
  }

  handleDeleteProject = (e, id) => {
    e.preventDefault();
    let { projects } = this.state;

    projects = projects.filter(p => p._id !== id);
    this.setState({
      projects
    })
  }

  handleUpdateProject = (e, id) => {
    e.preventDefault();
    let { projects, collaborators, updateData, users } = this.state;
    updateData = true;
    let selProject = projects.filter(p => p._id === id)[0];
    console.log("collabs : " + selProject.collaborators);
    let projectForm = document.querySelector('#project_data');
    let projectId = document.querySelector('#project_id');
    let projectName = document.querySelector('#project_name');
    let projectDescription = document.querySelector('#project_description');
    projectId.value = id;
    projectName.value = selProject.name;
    projectDescription.value = selProject.description;
    collaborators = selProject.collaborators;
    users = users.filter(u => selProject.collaborators.indexOf(u) === -1)
    this.setState({
      updateData,
      collaborators,
      users
    })

  }

  handleSaveProject = (e) => {
    e.preventDefault();
    let { projects, collaborators, updateData, users } = this.state;
    let ProjectData = new FormData(e.target);
    let project_id = ProjectData.get('project_id');
    let project_name = ProjectData.get('project_name');
    let project_description = ProjectData.get('project_description');
    let project_collabs = ProjectData.get('collaborators');
    let project = {};
    project._id = updateData ? parseInt(project_id) : projects.length + 1;
    project.name = project_name;
    project.description = project_description;
    project.created_by = this.state.currentUser;
    project.collaborators = collaborators;
    const projectIndex = projects.findIndex(p => p._id === project._id);
    const newProjects = updateData ? update(projects, {
      [projectIndex]: { $set: project },
    }) : update(projects, { $push: [project] });
    console.log(newProjects);


    let projectId = document.querySelector('#project_id');
    let projectName = document.querySelector('#project_name');
    let projectDescription = document.querySelector('#project_description');
    projectId.value = 0;
    projectName.value = '';
    projectDescription.value = '';

    this.setState({
      projects: newProjects,
      users: user.map(u => u.username),
      collaborators: [],
      updateData: false
    })
  }

  onChangeProjectDescription = (e) => {
    this.setState({
      projectDescription: e.target.value,
    });
  };

  onChangeProjectName = (e) => {
    this.setState({
      projectName: e.target.value,
    });
  };

  componentDidMount() {
    this.setState({
      projects: project,
      users: user.map(u => u.username),
      selectedCollab: user[0].username,
      currentUser: this.props.user ? this.props.user.username : "",
    });
  }

  handleSelectCollaborator = (e) => {
    this.setState({
      selectedCollab: e.target.value,
    });
  };

  handleDeSelectCollaborator = (coll) => {
    let { users, collaborators, selectedCollab } = this.state;
    console.log(coll)
    selectedCollab = coll;
    collaborators = collaborators.filter(c => c !== selectedCollab);
    users = [...users, selectedCollab];
    this.setState({
      users,
      collaborators,
      selectedCollab,
    });
  }

  handleAddCollaborator = () => {
    let { users, collaborators, selectedCollab } = this.state;
    if (users.length > 0) {
      collaborators = [...collaborators, selectedCollab];
      users = users.filter((u) => u !== selectedCollab);
      selectedCollab = users.length > 0 ? users[0] : "";
      this.setState({
        users,
        collaborators,
        selectedCollab,
      });
    }
  };
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <Form id="project_data" onSubmit={this.handleSaveProject}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="hidden" id="project_id" name="project_id" />
              <Form.Control type="text" id="project_name" name="project_name" onChange={this.onChangeProjectName} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Project Description</Form.Label>
              <Form.Control as="textarea" rows={3} id="project_description" name="project_description" />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                <Form.Label>Collaborators</Form.Label>
                <Form.Control
                  as="select"
                  onLoad={this.handleSelectCollaborator}
                  onChange={this.handleSelectCollaborator}
                >
                  {this.state.users.map((u, index) => {
                    return <option key={index}>{u}</option>;
                  })}
                </Form.Control>

                <Button
                  className="float-right"
                  style={{ marginTop: 30 }}
                  onClick={this.handleAddCollaborator}
                >
                  Add Collaborator
              </Button>
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlSelect2">
                <Form.Label>Project Collaborator List</Form.Label>
                <ListGroup name="collaborators" style={{ height: 200, overflow: 'scroll' }}>
                  {this.state.collaborators.map((coll) => {
                    return (
                      <ListGroupItem key={coll}>
                        {coll}
                        <span
                          className="float-right btn btn-primary"
                          onClick={() => this.handleDeSelectCollaborator(coll)}
                        >
                          X
                      </span>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </Form.Group>
            </Form.Row>
            <Button className="float-right" type="submit">Save Project</Button>
          </Form>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Project Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.projects
              .filter(
                (p) => p.collaborators.indexOf(this.state.currentUser) != -1
              )
              .map((p, index) => {
                return (
                  <tr key={index}>
                    <td>{p._id}</td>
                    <td>{p.name}</td>
                    <td width="600px">{p.description}</td>
                    <td
                      width="300px"
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <Link to={{
                        pathname: "/member_space",
                        projectprops: {
                          user: this.state.currentUser,
                          project: p
                        }
                      }} className="btn btn-primary">
                        Follow
                      </Link>
                      <Button onClick={(e) => this.handleUpdateProject(e, p._id)}>Update</Button>
                      <Button onClick={(e) => this.handleDeleteProject(e, p._id)} style={{ display: p.created_by === this.state.currentUser ? 'block' : 'none' }}>Delete</Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>


      </div>
    );
  }
}
