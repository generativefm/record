import { addBreadcrumb } from '@sentry/react';
import shouldUse from './should-use';

const noopMiddleware = () => (next) => (action) => next(action);

const breadcrumbMiddleware = () => (next) => (action) => {
  addBreadcrumb({
    data: action,
    category: 'redux.action',
    timestamp: Date.now(),
  });
  return next(action);
};

export default shouldUse ? breadcrumbMiddleware : noopMiddleware;
