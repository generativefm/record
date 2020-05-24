import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import userFinishedAdjustingVolume from './actions/user-finished-adjusting-volume.creator';
import pipe from '../utilities/pipe';
import './volume-slider.styles.scss';

const VolumeSlider = ({ volumeLevelPercentage, onVolumeChange }) => {
  const [isChanging, setIsChanging] = useState(false);
  const volumeBarRef = useRef(null);
  const dispatch = useDispatch();

  const getVolumeLevelForMousePosition = useCallback(
    (clientX) => {
      if (volumeBarRef.current) {
        const { x, width } = volumeBarRef.current.getBoundingClientRect();
        const xPositionPercent = Math.min(
          Math.max((clientX - x) / width, 0),
          1
        );
        return xPositionPercent;
      }
      return 0;
    },
    [volumeBarRef]
  );

  const updateVolumeLevelForMousePosition = useCallback(
    (clientX) => pipe(getVolumeLevelForMousePosition, onVolumeChange)(clientX),
    [getVolumeLevelForMousePosition, onVolumeChange]
  );

  const handlePointerDown = useCallback(
    (event) => {
      if (volumeBarRef.current) {
        setIsChanging(true);
        updateVolumeLevelForMousePosition(event.clientX);
        volumeBarRef.current.setPointerCapture(event.pointerId);
      }
    },
    [volumeBarRef, updateVolumeLevelForMousePosition]
  );

  const handlePointerUp = useCallback(
    (event) => {
      if (volumeBarRef.current) {
        setIsChanging(false);
        volumeBarRef.current.releasePointerCapture(event.pointerId);
        const finalValue = getVolumeLevelForMousePosition(event.clientX);
        dispatch(userFinishedAdjustingVolume(finalValue));
      }
    },
    [volumeBarRef, setIsChanging, dispatch, getVolumeLevelForMousePosition]
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (volumeBarRef.current && isChanging) {
        updateVolumeLevelForMousePosition(event.clientX);
      }
    },
    [volumeBarRef, isChanging, updateVolumeLevelForMousePosition]
  );

  return (
    <div
      className="volume-slider"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <div className="volume-slider__bar" ref={volumeBarRef}>
        <div
          className={`volume-slider__bar__level${
            isChanging ? ' volume-slider__bar__level--is-changing' : ''
          }`}
          style={{ width: `${volumeLevelPercentage * 100}%` }}
        />
      </div>
    </div>
  );
};

VolumeSlider.propTypes = {
  volumeLevelPercentage: PropTypes.number.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
};

export default VolumeSlider;
