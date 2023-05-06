import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './services/store';

import './index.css';
import WrappedApp from './components/app/app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <WrappedApp />
  </Provider>,
);
