import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout/layout.component';
import './styles/base.scss';

const rootEl = document.getElementById('root');

render(
  <Router>
    <Layout />
  </Router>,
  rootEl
);
