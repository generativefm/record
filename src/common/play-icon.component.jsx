import React from 'react';
import PropTypes from 'prop-types';

const PlayIcon = ({ width }) => {
  const xAdjustment = width / 6;
  const pointX = Math.sqrt((3 * width ** 2) / 4);
  return (
    <svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`M${xAdjustment},0L${pointX + xAdjustment},${
          width / 2
        }L${xAdjustment},${width}`}
        fill="currentColor"
      />
    </svg>
  );
};

PlayIcon.propTypes = {
  width: PropTypes.number.isRequired,
};

export default PlayIcon;
