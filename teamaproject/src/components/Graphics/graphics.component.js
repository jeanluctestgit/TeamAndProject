import React, { Component } from "react";
import { Bar , HorizontalBar , Doughnut } from "react-chartjs-2";
import { Row , Col} from 'react-bootstrap';
import {
  tasks,
  channels,
  labelsMap,
  users,
  status,
} from "../../fixtures/task.fixture";
const countOccurrencesPerCategory = (arr, val) =>
  arr.reduce((a, v) => (v.category === val ? a + 1 : a), 0);

  const countOccurrencesPerUser = (arr, val) =>
  arr.reduce((a, v) => (v.for.includes(val) ? a + 1 : a), 0);

export default class Graphics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OccurencesPercategory : {
        labels: channels,
        datasets: [
          {
            label: "nb tasks todo",
            data: channels.map((channel) => {
              let arr = tasks.filter(item => item.status === 'todo')
              return countOccurrencesPerCategory(arr, channel);
            }),
            backgroundColor: '#D6E9C6'
          },
          {
              label: "nb tasks doing",
              data: channels.map((channel) => {
                let arr = tasks.filter(item => item.status === 'doing')
                return countOccurrencesPerCategory(arr, channel);
              }),
              backgroundColor: '#ace0f2'
            },
            {
              label: "nb tasks done",
              data: channels.map((channel) => {
                let arr = tasks.filter(item => item.status === 'done')
                return countOccurrencesPerCategory(arr, channel);
              }),
              backgroundColor: '#EBCCD1'
            }
        ],
      },

      OccurencesPerUsers : {
        labels: users.map(user => user.name),
        datasets: [
          {
            label: "nb tasks todo",
            data: users.map((user) => {
              let arr = tasks.filter(item => item.status === 'todo')
              return countOccurrencesPerUser(arr, user.name);
            }),
            backgroundColor: '#D6E9C6'
          },
          {
              label: "nb tasks doing",
              data: users.map((user) => {
                let arr = tasks.filter(item => item.status === 'doing')
                return countOccurrencesPerUser(arr, user.name);
              }),
              backgroundColor: '#ace0f2'
            },
            {
              label: "nb tasks done",
              data: users.map((user) => {
                let arr = tasks.filter(item => item.status === 'done')
                return countOccurrencesPerUser(arr, user.name);
              }),
              backgroundColor: '#EBCCD1'
            }
        ],
      },
      OccurencesPerStatus : {
        labels: status,
        datasets: [{
          data: [
                 tasks.filter(item => item.status === 'todo').length,
                 tasks.filter(item => item.status === 'doing').length,
                 tasks.filter(item => item.status === 'done').length
          ],
          backgroundColor : [
            '#D6E9C6',
            '#ace0f2',
            '#EBCCD1'
          ]
        }
          
            
        ],
      }
      
    };
  }
  render() {
    return (
      <div className="container">
        Graphics
        <div style = {{ width : 1070 , height : 600}}>
        <Row>
          <Col>
          <Bar
          
          data={this.state.OccurencesPercategory}
          options={{
            title: {
              display: true,
              text: "NB Task per category and status",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
            scales: {
                xAxes: [{ stacked: true }],
                yAxes: [{ stacked: true }]
              }
          }}
        />
          </Col>
          <Col>
          <Doughnut
          data = {this.state.OccurencesPerStatus}
          options={{
            title: {
              display: true,
              text: "NB Task per status",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            }
          }}
        />
          </Col>

        </Row>
        <Row>
            <Col>
            <div className="card">
            <HorizontalBar
          
          data={this.state.OccurencesPerUsers}
          options={{
            title: {
              display: true,
              text: "NB Task per users and status",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
            scales: {
                xAxes: [{ stacked: true }],
                yAxes: [{ stacked: true }]
              }
          }}
        />
            </div>
            
            </Col>
        </Row>
        

        


        </div>

        
        
      </div>
    );
  }
}
