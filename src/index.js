import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Login from './app/app';
import './index.css';
import App from './app/app';

ReactDOM.render(
  <App />,

  document.getElementById('root')
);

serviceWorker.unregister();
