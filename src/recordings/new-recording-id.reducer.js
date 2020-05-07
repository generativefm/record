import USER_REQUESTED_NEW_RECORDING from './actions/user-requested-new-recording.type';
import USER_CANCELED_NEW_RECORDING from './actions/user-canceled-new-recording.type';
import USER_OPENED_NEW_RECORDING_CONFIG from './actions/user-opened-new-recording-config.type';

const DEFAULT_STATE = '';

const newRecordingId = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case USER_OPENED_NEW_RECORDING_CONFIG: {
      return action.payload;
    }
    case USER_REQUESTED_NEW_RECORDING:
    case USER_CANCELED_NEW_RECORDING: {
      return DEFAULT_STATE;
    }
    default: {
      return state;
    }
  }
};

export default newRecordingId;
