import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { State } from './context/state'

ReactDOM.render(
  <React.StrictMode>
    <State>
      <App />
    </State>
  </React.StrictMode>,
  document.getElementById('root')
);
