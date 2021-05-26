import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './layout/layout.component';
import getStore from './store/get-store';
import MasterGainProvider from './volume/master-gain-provider.component';
import recordingsLoadedFromStorage from './recordings/actions/recordings-loaded-from-storage.creator';
import loadRecordings from './storage/load-recordings';
import maybeInitializeSentry from './sentry/initialize';
import '@generative.fm/web-ui/styles/base.scss';
import './styles/base.scss';

maybeInitializeSentry();

const rootEl = document.getElementById('root');

getStore().then((store) => {
  loadRecordings().then((storedRecordings) => {
    store.dispatch(recordingsLoadedFromStorage(storedRecordings));
  });
  render(
    <Router>
      <Provider store={store}>
        <MasterGainProvider>
          <Layout />
        </MasterGainProvider>
      </Provider>
    </Router>,
    rootEl
  );
});
