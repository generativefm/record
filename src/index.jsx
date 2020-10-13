import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import Layout from './layout/layout.component';
import getStore from './store/get-store';
import MasterGainProvider from './volume/master-gain-provider.component';
import recordingsLoadedFromStorage from './recordings/actions/recordings-loaded-from-storage.creator';
import loadRecordings from './storage/load-recordings';
import isProduction from './utilities/is-production';
import './styles/base.scss';

if (isProduction) {
  Sentry.init({
    dsn:
      'https://706481c04f7e460791b36123b381fddf@o461193.ingest.sentry.io/5462662',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1,
  });
}

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
