import pipe from '../utilities/pipe';
import selectAlerts from './alerts.selector';

const persistedOnly = (alerts) =>
  Object.keys(alerts).reduce((persistedAlerts, alertId) => {
    const alert = alerts[alertId];
    if (alert.isPersisted) {
      persistedAlerts[alertId] = alerts[alertId];
    }
    return persistedAlerts;
  }, {});

const selectPersistedAlerts = pipe(selectAlerts, persistedOnly);

export default selectPersistedAlerts;
