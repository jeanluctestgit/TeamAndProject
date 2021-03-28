import React, { Component } from "react";
import axios from "axios";
import DownloadLink from "react-download-link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Moment from 'moment'

import FileBrowser, { FileRenderers, FolderRenderers, Groupers, Icons } from 'react-keyed-file-browser'


export default class DocManagement extends Component {
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }

  state = {
    documents: [
      {
        key: "myPdf.pdf",
        path: "http://localhost:3000/Mon%20SQL.pdf",
      },
      {
        key: "myCSV.csv",
        path: "http://localhost:3000/course_order_line.csv",
      },
    ],
  };

  handleUpload = (e) => {
    e.preventDefault();
    let formData = new FormData(document.querySelector('#upload_file'))
    axios.post('/', formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })
    .then(res => {
        console.log({res});
    }).catch(err => {
        console.error({err});
    });
  };

  getDownloadFile = async (path) => {
    return axios
      .get(path, {
        responseType: "blob",
      })
      .then((response) => response.data);
  };
  render() {
    return (
      <div>
        Documents Of Project
        <div className="card">
          <form id = "upload_file"  onSubmit={this.handleUpload} enctype="multipart/form-data">
            <div>
              <input type="file" name="file" id="file" />
              <input
                type="submit"
                value="upload"
                className="btn btn-primary float-right"
              />
            </div>
          </form>
        </div>
        <ListGroup>
          {this.state.documents.map((doc, index) => {
            return (
              <ListGroupItem key={index}>
                {doc.key}
                <DownloadLink
                  label="Download"
                  className="btn btn-primary float-right"
                  style={{ color: "white" }}
                  filename={doc.key}
                  exportFile={() => this.getDownloadFile(doc.path)}
                />
              </ListGroupItem>
            );
          })}
        </ListGroup>
        
      </div>
    );
  }
}
