import React from 'react';
import { useLayoutEffect } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, useLocation } from 'react-router-dom'
import App from './App';
import { useMock } from './config'
import './index.css';

if (useMock) {
  require('./utils/mockData')
}

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
      <Wrapper>
        <App />
      </Wrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
