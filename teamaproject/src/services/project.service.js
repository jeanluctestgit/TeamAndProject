import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/api/projects/';

class ProjectService {
  getAllProjects() {
    return axios.get(API_URL + '' ,  { headers: authHeader() });
  }

  getProject(id) {
    return axios.get(API_URL + id , { headers: authHeader() });
  }

  createProject(data){
    return axios.post(API_URL, data , { headers: authHeader() })
                .then(response => {
                    return response.data;
                });
  }
  updateProject(id,data){
    return axios.put(API_URL + id, data , { headers: authHeader() })
                .then(response => {
                    return response.data;
                }); 
  }
  deleteProject(id){
    return axios.delete(API_URL + id , { headers: authHeader() });
  }
}

export default new ProjectService();