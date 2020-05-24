import { createStore, combineReducers, applyMiddleware } from 'redux';
import newRecordingId from '../recordings/new-recording-id.reducer';
import recordings from '../recordings/recordings.reducer';
import searchTerm from '../search/search-term.reducer';
import recordMiddleware from '../recordings/record.middleware';
import loadStoredRecordingsMiddleware from '../recordings/load-stored-recordings.middleware';
import piecePlaybackMiddleware from '../playback/piece-playback.middleware';
import playback from '../playback/playback.reducer';
import alerts from '../alerts/alerts.reducer';
import volume from '../volume/volume.reducer';

const reducer = combineReducers({
  newRecordingId,
  recordings,
  searchTerm,
  playback,
  alerts,
  volume,
});
const store = createStore(
  reducer,
  applyMiddleware(
    recordMiddleware,
    loadStoredRecordingsMiddleware,
    piecePlaybackMiddleware
  )
);

export default store;
