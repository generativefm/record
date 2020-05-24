import { combineReducers } from 'redux';
import status from './status.reducer';
import target from './target.reducer';

const playbackReducer = combineReducers({ status, target });

export default playbackReducer;
