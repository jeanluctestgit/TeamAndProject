import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthService from "./services/auth.service";


ReactDOM.render(
  
   <BrowserRouter>
      
      <App/>
    </BrowserRouter>
  
  ,
  document.getElementById("root")
);
