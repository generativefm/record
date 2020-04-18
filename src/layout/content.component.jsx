import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Browse from '../browse/browse.component';
import './content.styles.scss';

const Content = () => (
  <section className="content">
    <Switch>
      <Route path="/recordings">Recordings page</Route>
      <Route path="/licensing">Licensing page</Route>
      <Route path="/browse">
        <Browse />
      </Route>
      <Route path="/">
        <Redirect to="/browse" />
      </Route>
    </Switch>
  </section>
);

export default Content;
