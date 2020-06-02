import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import VolumeButton from './volume-button.component';
import VolumeSlider from './volume-slider.component';
import selectCurrentVolume from './current-volume.selector';
import useMasterGain from './use-master-gain.hook';
import './volume-control.styles.scss';

const VolumeControl = () => {
  const [volumeLevelPercentage, setVolumeLevelPercentage] = useState(0.5);
  const currentVolume = useSelector(selectCurrentVolume);
  const masterGain = useMasterGain();

  const handleVolumeChange = useCallback(
    (newVolume) => {
      setVolumeLevelPercentage(newVolume);
      masterGain.set({ gain: newVolume });
    },
    [masterGain]
  );

  useEffect(() => {
    setVolumeLevelPercentage(currentVolume);
  }, [currentVolume]);

  return (
    <div className="volume-control">
      <VolumeButton volumeLevelPercentage={volumeLevelPercentage} />
      <VolumeSlider
        volumeLevelPercentage={volumeLevelPercentage}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
};

export default VolumeControl;
