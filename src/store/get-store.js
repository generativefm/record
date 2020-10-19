import { createStore, combineReducers, applyMiddleware } from 'redux';
import recording from '../recordings/recording.reducer';
import searchTerm from '../search/search-term.reducer';
import recordMiddleware from '../recordings/record.middleware';
import piecePlaybackMiddleware from '../playback/piece-playback.middleware';
import playback from '../playback/playback.reducer';
import alerts from '../alerts/alerts.reducer';
import volume from '../volume/volume.reducer';
import persistStateMiddleware from '../storage/persist-state.middleware';
import loadStoredStateValues from '../storage/load-stored-state-values';
import silentHtml5AudioMiddleware from '../playback/silent-html5-audio.middleware';
import sentryBreadcrumbMiddleware from '../sentry/breadcrumb.middleware';
import donate from '../donate/donate.reducer';

const reducer = combineReducers({
  recording,
  searchTerm,
  playback,
  alerts,
  volume,
  donate,
});

const applyMiddlewareEnhancer = applyMiddleware(
  sentryBreadcrumbMiddleware,
  piecePlaybackMiddleware,
  recordMiddleware,
  silentHtml5AudioMiddleware,
  persistStateMiddleware
);

const getStore = () =>
  loadStoredStateValues().then((storedValues) => {
    const preloadedState = storedValues.reduce(
      (preloadedStateObj, { key, value }) => {
        const statePathKeys = key.split('.');
        const preloadedStateSlice = statePathKeys
          .slice(0, -1)
          .reduce((preloadedStateSliceObj, nestedKey) => {
            if (!preloadedStateSliceObj[nestedKey]) {
              preloadedStateSliceObj[nestedKey] = {};
            }
            return preloadedStateSliceObj[nestedKey];
          }, preloadedStateObj);
        preloadedStateSlice[statePathKeys[statePathKeys.length - 1]] = value;
        return preloadedStateObj;
      },
      {}
    );
    return createStore(reducer, preloadedState, applyMiddlewareEnhancer);
  });

export default getStore;
