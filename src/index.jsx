import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './layout/layout.component';
import store from './store/store';
import './styles/base.scss';

const rootEl = document.getElementById('root');

render(
  <Router>
    <Provider store={store}>
      <Layout />
    </Provider>
  </Router>,
  rootEl
);
