import { combineReducers } from 'redux';
import isPlaying from './is-playing.reducer';

const statusReducer = combineReducers({ isPlaying });

export default statusReducer;
