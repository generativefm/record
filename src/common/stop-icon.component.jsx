import React from 'react';
import PropTypes from 'prop-types';

const StopIcon = ({ width }) => {
  const innerWidth = 0.8 * width;
  const offset = (width - innerWidth) / 2;
  return (
    <svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x={offset}
        y={offset}
        width={innerWidth}
        height={innerWidth}
        fill="currentColor"
      />
    </svg>
  );
};

StopIcon.propTypes = {
  width: PropTypes.number.isRequired,
};

export default StopIcon;
