import React, { useEffect, useRef } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Donate } from '@generative.fm/web-ui';
import Browse from '../browse/browse.component';
import Recordings from '../recordings/recordings.component';
import Licensing from '../licensing/licensing.component';
import './content.styles.scss';

const Content = () => {
  const { pathname } = useLocation();
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <section className="content" ref={contentRef}>
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
};

export default Content;
