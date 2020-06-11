import { combineReducers } from 'redux';
import target from './target.reducer';
import isPlaying from './is-playing.reducer';
import isScheduling from './is-scheduling.reducer';

const playbackReducer = combineReducers({
  isPlaying,
  target,
  isScheduling,
});

export default playbackReducer;
