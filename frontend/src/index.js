import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

ReactDOM.render(
  <React.StrictMode>
    <Provider template={AlertTemplate} {...{ timeout: 8000, position: positions.BOTTOM_CENTER }} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
