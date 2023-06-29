/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Container from './Container';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Container />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);