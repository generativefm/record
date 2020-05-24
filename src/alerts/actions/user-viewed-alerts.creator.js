import type from './user-viewed-alerts.type';

const userViewedAlerts = (alertIds = []) => ({
  type,
  payload: new Set(alertIds),
});

export default userViewedAlerts;
