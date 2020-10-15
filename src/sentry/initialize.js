import { init } from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import shouldUse from './should-use';

const maybeInitialize = () => {
  if (shouldUse) {
    init({
      dsn:
        'https://706481c04f7e460791b36123b381fddf@o461193.ingest.sentry.io/5462662',
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1,
      release: process.env.RELEASE_TAG,
    });
  }
};

export default maybeInitialize;
