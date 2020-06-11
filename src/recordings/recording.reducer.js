import { combineReducers } from 'redux';
import recordings from './recordings.reducer';
import isLoadingFinished from './is-loading-finished.reducer';
import newRecordingId from './new-recording-id.reducer';

const recordingReducer = combineReducers({
  recordings,
  isLoadingFinished,
  newRecordingId,
});

export default recordingReducer;
