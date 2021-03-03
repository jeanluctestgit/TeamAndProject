import React, { Component } from 'react'
import axios from "axios";
import DownloadLink from "react-download-link";
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class DocManagement extends Component {

    state = {
       documents : [
           {
               name : 'myPdf.pdf' , path : "http://localhost:3000/Mon%20SQL.pdf"
           },
           {
            name : 'myCSV.csv' , path : "http://localhost:3000/course_order_line.csv"
           }
       ]
    }

    getDownloadFile = async (path) => {
        return axios.get(path, {
            responseType: 'blob',
        })
            .then(response => response.data)
    }
    render() {
        return (
            <div>
                Documents Of Project
                <ListGroup>
                  {
                      this.state.documents.map((doc , index )=> {
                          return (
                              <ListGroupItem key = {index}>
                                {doc.name}
                                <DownloadLink label="Download" className = "btn btn-primary float-right" style={{color:'white'}}
                                  filename={doc.name} exportFile={() => this.getDownloadFile(doc.path)} />
                              </ListGroupItem>
                          )
                      })
                  }
                </ListGroup>
                
            </div>
        )
    }
}
