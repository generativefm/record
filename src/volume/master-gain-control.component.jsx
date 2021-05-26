import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VolumeControl } from '@generative.fm/web-ui';
import selectCurrentVolume from './current-volume.selector';
import useMasterGain from './use-master-gain.hook';
import userClickedVolumeToggle from './actions/user-clicked-volume-toggle.creator';
import userAdjustedVolume from './actions/user-adjusted-volume.creator';

const MasterGainControl = () => {
  const currentVolume = useSelector(selectCurrentVolume);
  const masterGain = useMasterGain();
  const dispatch = useDispatch();

  useEffect(() => {
    masterGain.set({ gain: currentVolume });
  }, [masterGain, currentVolume]);

  const handleMuteToggle = useCallback(() => {
    dispatch(userClickedVolumeToggle());
  }, [dispatch]);

  const handleVolumeChange = useCallback(
    (newVolume) => {
      dispatch(userAdjustedVolume(newVolume));
    },
    [dispatch]
  );

  return (
    <VolumeControl
      value={currentVolume}
      onMuteToggle={handleMuteToggle}
      onChange={handleVolumeChange}
    />
  );
};

export default MasterGainControl;
