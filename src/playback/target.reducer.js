import USER_CLICKED_PLAY from './actions/user-clicked-play.type';

const targetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CLICKED_PLAY: {
      const { id, type } = action.payload;
      return {
        id,
        type,
      };
    }
    default: {
      return state;
    }
  }
};

export default targetReducer;
