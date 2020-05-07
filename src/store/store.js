import { createStore, combineReducers, applyMiddleware } from 'redux';
import newRecordingId from '../recordings/new-recording-id.reducer';
import recordings from '../recordings/recordings.reducer';
import searchTerm from '../layout/search/search-term.reducer';
import recordMiddleware from '../recordings/record.middleware';
import loadStoredRecordingsMiddleware from '../recordings/load-stored-recordings.middleware';

const reducer = combineReducers({ newRecordingId, recordings, searchTerm });
const store = createStore(
  reducer,
  applyMiddleware(recordMiddleware, loadStoredRecordingsMiddleware)
);

export default store;
