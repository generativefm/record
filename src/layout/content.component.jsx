import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Browse from '../browse/browse.component';
import Recordings from '../recordings/recordings.component';
import Licensing from '../licensing/licensing.component';
import Donate from '../donate/donate';
import './content.styles.scss';

const Content = () => (
  <section className="content">
    <Switch>
      <Route path="/recordings">
        <Recordings />
      </Route>
      <Route path="/licensing">
        <Licensing />
      </Route>
      <Route path="/browse">
        <Browse />
      </Route>
      <Route path="/donate">
        <Donate />
      </Route>
      <Route path="/">
        <Redirect to="/browse" />
      </Route>
    </Switch>
  </section>
);

export default Content;
