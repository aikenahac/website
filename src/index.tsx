import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import { Footer } from './components';
import { Home } from './pages';

ReactDOM.render(
  <React.StrictMode>
    <Home />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root'),
);
