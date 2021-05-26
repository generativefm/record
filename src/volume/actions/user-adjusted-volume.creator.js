import type from './user-adjusted-volume.type';

const userAdjustedVolume = (newValue) => ({
  type,
  payload: Math.min(1, Math.max(0, newValue)),
});

export default userAdjustedVolume;
