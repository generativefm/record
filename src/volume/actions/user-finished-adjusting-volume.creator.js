import type from './user-finished-adjusting-volume.type';

const userFinishedAdjustingVolume = (newValue) => ({
  type,
  payload: Math.min(1, Math.max(0, newValue)),
});

export default userFinishedAdjustingVolume;
