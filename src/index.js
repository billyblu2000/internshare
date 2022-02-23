import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { useMock } from './config'
if (useMock){
  require('./mockData')
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
