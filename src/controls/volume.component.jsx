import React, { useState, useCallback, useRef } from 'react';
import './volume.styles.scss';

const Volume = () => {
  const [volumeLevelPercentage, setVolumeLevelPercentage] = useState(0.5);
  const [isChanging, setIsChanging] = useState(false);
  const volumeBarRef = useRef(null);

  const handlePointerDown = useCallback(
    (event) => {
      if (volumeBarRef.current) {
        setIsChanging(true);
        volumeBarRef.current.setPointerCapture(event.pointerId);
      }
    },
    [volumeBarRef]
  );

  const handlePointerUp = useCallback(
    (event) => {
      if (volumeBarRef.current) {
        setIsChanging(false);
        volumeBarRef.current.releasePointerCapture(event.pointerId);
      }
    },
    [volumeBarRef]
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (volumeBarRef.current && isChanging) {
        const { x, width } = volumeBarRef.current.getBoundingClientRect();
        const xPositionPercent = Math.min(
          Math.max((event.clientX - x) / width, 0),
          1
        );
        setVolumeLevelPercentage(xPositionPercent);
      }
    },
    [volumeBarRef, isChanging]
  );

  return (
    <div
      className="volume"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <div className="volume__bar" ref={volumeBarRef}>
        <div
          className={`volume__level${
            isChanging ? ' volume__level--is-changing' : ''
          }`}
          style={{ width: `${volumeLevelPercentage * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Volume;
