import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/api/projects/';

class TaskService {
  getAllTasks(project_id) {
    return axios.get(API_URL + project_id + '/tasks' ,  { headers: authHeader() });
  }

  getTask(project_id,id) {
    return axios.get(API_URL + project_id + '/tasks/' +  id , { headers: authHeader() });
  }

  createTask(project_id , data){
    return axios.post(API_URL + project_id + '/tasks', data , { headers: authHeader() })
                .then(response => {
                    return response.data;
                });
  }
  updateTask(project_id,id,data){
    return axios.put(API_URL + project_id + '/tasks/' +  id , data , { headers: authHeader() })
                .then(response => {
                    return response.data;
                }); 
  }
  deleteTask(project_id,id){
    return axios.delete(API_URL + project_id + '/tasks/' +  id, { headers: authHeader() });
  }
}

export default new TaskService();