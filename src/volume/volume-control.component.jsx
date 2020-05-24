import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import VolumeButton from './volume-button.component';
import VolumeSlider from './volume-slider.component';
import selectCurrentVolume from './current-volume.selector';
import './volume-control.styles.scss';

const VolumeControl = () => {
  const [volumeLevelPercentage, setVolumeLevelPercentage] = useState(0.5);
  const currentVolume = useSelector(selectCurrentVolume);

  useEffect(() => {
    setVolumeLevelPercentage(currentVolume);
  }, [currentVolume]);

  return (
    <div className="volume-control">
      <VolumeButton volumeLevelPercentage={volumeLevelPercentage} />
      <VolumeSlider
        volumeLevelPercentage={volumeLevelPercentage}
        onVolumeChange={setVolumeLevelPercentage}
      />
    </div>
  );
};

export default VolumeControl;
