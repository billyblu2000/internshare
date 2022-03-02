import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { useMock, lightBackground } from './config'
import './index.css';

if (useMock){
  require('./utils/mockData')
}
document.getElementsByTagName('body')[0].style.backgroundColor=lightBackground
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
