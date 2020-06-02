import USER_CLICKED_PLAY from './actions/user-clicked-play.type';
import USER_CLICKED_STOP from './actions/user-clicked-stop.type';
import USER_REQUESTED_NEW_RECORDING from '../recordings/actions/user-requested-new-recording.type';

const isPlayingReducer = (state = false, action) => {
  switch (action.type) {
    case USER_CLICKED_PLAY: {
      return true;
    }
    case USER_CLICKED_STOP:
    case USER_REQUESTED_NEW_RECORDING: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default isPlayingReducer;
