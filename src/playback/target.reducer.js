import USER_PICKED_TARGET from './actions/user-picked-target.type';

const targetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PICKED_TARGET: {
      const { id, type } = action;
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
