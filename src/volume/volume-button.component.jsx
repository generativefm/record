import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '../common/button.component';
import VolumeUpIcon from './volume-up-icon.component';
import VolumeDownIcon from './volume-down-icon.component';
import VolumeMuteIcon from './volume-mute-icon.component';
import userClickedVolumeToggle from './actions/user-clicked-volume-toggle.creator';
import './volume-button.styles.scss';

const VolumeButton = ({ volumeLevelPercentage }) => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(userClickedVolumeToggle());
  }, [dispatch]);

  let VolumeIcon;
  if (volumeLevelPercentage > 0.5) {
    VolumeIcon = VolumeUpIcon;
  } else if (volumeLevelPercentage > 0) {
    VolumeIcon = VolumeDownIcon;
  } else {
    VolumeIcon = VolumeMuteIcon;
  }
  return (
    <Button
      className="button--stroke"
      onClick={handleClick}
      tooltip={volumeLevelPercentage === 0 ? 'Unmute' : 'Mute'}
    >
      <VolumeIcon />
    </Button>
  );
};

VolumeButton.propTypes = {
  volumeLevelPercentage: PropTypes.number.isRequired,
};

export default VolumeButton;
