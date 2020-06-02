import type from './user-clicked-play.type';

const userClickedPlay = (targetConfig) => {
  return {
    type,
    payload: targetConfig && {
      id: targetConfig.id,
      type: targetConfig.type,
      destinationNode: targetConfig.destinationNode,
    },
  };
};

export default userClickedPlay;
