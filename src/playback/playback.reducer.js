import { combineReducers } from 'redux';
import target from './target.reducer';
import isPlaying from './is-playing.reducer';

const playbackReducer = combineReducers({ isPlaying, target });

export default playbackReducer;
