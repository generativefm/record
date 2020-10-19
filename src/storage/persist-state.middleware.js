import openDb from './open-db';
import selectVolume from '../volume/volume.selector';
import selectPlaybackTarget from '../playback/target.selector';
import selectPersistedAlerts from '../alerts/persisted-alerts.selector';
import selectIsPromptAllowed from '../donate/is-prompt-allowed.selector';
import pipe from '../utilities/pipe';
import STATE_OBJECT_STORE_NAME from './state-object-store-name';
import promisifyTransaction from './promisify-transaction';

const selectors = {
  volume: selectVolume,
  'playback.target': selectPlaybackTarget,
  alerts: selectPersistedAlerts,
  'donate.isPromptAllowed': selectIsPromptAllowed,
};

const selectValuesFromState = (state) =>
  Object.keys(selectors).reduce((stateValues, key) => {
    const selector = selectors[key];
    stateValues[key] = selector(state);
    return stateValues;
  }, {});

const stateStorageMiddleware = (store) => (next) => {
  const selectStateValues = pipe(store.getState, selectValuesFromState);
  const scheduleFn =
    typeof window.requestIdleCallback === 'function'
      ? window.requestIdleCallback
      : (fn) => setTimeout(fn, 0);
  return (action) => {
    const preActionValues = selectStateValues();
    const result = next(action);
    const postActionValues = selectStateValues();
    const updates = Object.keys(selectors)
      .filter((key) => preActionValues[key] !== postActionValues[key])
      .map((key) => ({ key, value: postActionValues[key] }));

    scheduleFn(() =>
      openDb().then((db) => {
        const stateObjectStore = db
          .transaction([STATE_OBJECT_STORE_NAME], 'readwrite')
          .objectStore(STATE_OBJECT_STORE_NAME);
        const putUpdate = pipe(
          IDBObjectStore.prototype.put.bind(stateObjectStore),
          promisifyTransaction
        );
        return Promise.all(updates.map((update) => putUpdate(update)));
      })
    );
    return result;
  };
};

export default stateStorageMiddleware;
