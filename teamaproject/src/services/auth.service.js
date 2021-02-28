import axios from "axios";
import user from "../fixtures/user.fixture";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    /*return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });*/
      let _user = user.filter((item) => (item.username === username));
      console.log(_user);
      localStorage.setItem("user",JSON.stringify(_user));
  }

  logout() {
    localStorage.removeItem("user");
    
  }

  register(username, email, password) {
    
    user.push({username : username , useremail : email , userpassword : password})
    /*return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });*/
  }

  getCurrentUser() {
    
    return JSON.parse(localStorage.getItem('user'));;
    
  }
}

export default new AuthService();