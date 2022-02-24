import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { useMock } from './config'
import './index.css';

if (useMock){
  require('./mockData')
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
