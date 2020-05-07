import USER_PICKED_TARGET from './user-picked-target.type';
import RECORDING from './recording.type';
import PIECE from './piece.type';

const validTargetTypes = new Set([PIECE, RECORDING]);

const userPickedTarget = ({ id, type }) => {
  if (!validTargetTypes.has(type)) {
    throw new Error(
      `Unknown playback target type "${type}" was passed to userPickedTarget action creator. Type must be one of ${Array.from(
        validTargetTypes
      ).join(', ')}.`
    );
  }
  return {
    type: USER_PICKED_TARGET,
    payload: {
      id,
      type,
    },
  };
};

export default userPickedTarget;
