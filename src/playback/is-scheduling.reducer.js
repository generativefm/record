import PIECE_STARTED_SCHEDULING from './actions/piece-started-scheduling.type';
import PIECE_FINISHED_SCHEDULING from './actions/piece-finished-scheduling.type';

const isSchedulingReducer = (state = false, action) => {
  switch (action.type) {
    case PIECE_STARTED_SCHEDULING: {
      return true;
    }
    case PIECE_FINISHED_SCHEDULING: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default isSchedulingReducer;
