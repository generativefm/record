import USER_REQUESTED_NEW_RECORDING from './actions/user-requested-new-recording.type';
import RECORDING_PROGRESS_UPDATED from './actions/recording-progress-updated.type';
import RECORDINGS_LOADED_FROM_STORAGE from './actions/recordings-loaded-from-storage.type';

const DEFAULT_STATE = {};

const recordingsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case USER_REQUESTED_NEW_RECORDING: {
      const {
        recordingId,
        pieceId,
        length,
        fadeIn,
        fadeOut,
        queuedAt,
      } = action.payload;
      return {
        ...state,
        [recordingId]: {
          recordingId,
          pieceId,
          length,
          queuedAt,
          fadeIn,
          fadeOut,
          progress: 0,
        },
      };
    }
    case RECORDING_PROGRESS_UPDATED: {
      const { recordingId, progress } = action.payload;
      const recording = state[recordingId];
      if (!recording) {
        return state;
      }
      return {
        ...state,
        [recordingId]: {
          ...recording,
          progress,
        },
      };
    }
    case RECORDINGS_LOADED_FROM_STORAGE: {
      return {
        ...action.payload.reduce((o, recording) => {
          o[recording.recordingId] = recording;
          return o;
        }, {}),
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

export default recordingsReducer;
