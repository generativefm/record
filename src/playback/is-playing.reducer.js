import USER_PICKED_TARGET from './actions/user-picked-target.type';

const isPlayingReducer = (state = false, action) => {
  switch (action.type) {
    case USER_PICKED_TARGET: {
      return true;
    }
    default: {
      return state;
    }
  }
};

export default isPlayingReducer;
