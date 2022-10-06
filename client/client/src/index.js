import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
// import Userregistration from './pages/UserRegistration';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ViewSingleProject from './pages/ViewSingleProject';
import CreateProjectPage from './pages/CreateProjectPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

ReactDOM.render(
  <ViewSingleProject/>,
  document.getElementById('root')
);