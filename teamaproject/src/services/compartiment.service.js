import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/api/projects/';

class CompartimentService {
  getAllCompartiments(project_id) {
    return axios.get(API_URL + project_id + '/compartiments' ,  { headers: authHeader() });
  }

  getCompartiment(project_id,id) {
    return axios.get(API_URL + project_id + '/compartiments/' +  id , { headers: authHeader() });
  }

  createCompartiment(project_id , data){
    return axios.post(API_URL + project_id + '/compartiments', data , { headers: authHeader() })
                .then(response => {
                    return response.data;
                });
  }
  updateCompartiment(project_id,id,data){
    return axios.put(API_URL + project_id + '/compartiments/' +  id , data , { headers: authHeader() })
                .then(response => {
                    return response.data;
                }); 
  }
  deleteCompartiment(project_id,id){
    return axios.delete(API_URL + project_id + '/compartiments/' +  id, { headers: authHeader() });
  }
}

export default new CompartimentService();