import React, { Component } from "react";
import Avatar, { ConfigProvider } from "react-avatar";
import Moment from "react-moment";
import * as Icon from "react-bootstrap-icons";

export default class UserTaskCard extends Component {
  render() {
    return (
      <div
        className="card pt-1 mb-2"
        style={{
          marginTop: 3,
          marginLeft: 2,
          marginRight: 2,
          borderTop: "4px solid black",
          backgroundColor : "rgb(226, 180, 63)"
        }}
        onDoubleClick={this.props.onDblClick}
      >
        <div className="px-2 pt-2">
          <h3 className="name">
            {this.props.item.title}
            
          </h3>
        </div>
        <div className="px-3 pt-3">
          <p className="quote2" style={{ fontSize: "14px" }}>
            {this.props.item.description}
          </p>
        </div>
        <div class="d-flex justify-content-start px-3 align-items-center">
          {" "}
          <i className="mdi mdi-view-comfy task"></i>{" "}
          <span class="quote2 pl-2">status: {this.props.item.status}</span>{" "}
        </div>

        <div className="d-flex justify-content-start px-3 align-items-center">
          {" "}
          <i className="mdi mdi-calendar-clock date"></i>
          <span className="pl-2">
            Start: <Moment format="DD-MM-YYYY" style={{fontSize : 13}}>{this.props.item.start}</Moment>
          </span>{" "}
          <span className="quote2 pl-2">
            End: <Moment format="DD-MM-YYYY" style={{fontSize : 13}}>{this.props.item.end}</Moment>{" "}
          </span>{" "}
        </div>
        <hr></hr>
        <div className="d-flex justify-content-start px-3 pb-2 align-items-center">
          {this.props.item.for.map((p) => {
            return <Avatar name={p} size="24" round={true} />;
          })}{" "}
        </div>
      </div>
    );
  }
}