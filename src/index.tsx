import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import Routes from './Router';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Footer } from './components';

const browserHistory = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

ReactDOM.render(
  <React.StrictMode>
    <Router history={browserHistory}>
      <Routes />
    </Router>
    <Footer />
  </React.StrictMode>,
  document.getElementById('root'),
);
