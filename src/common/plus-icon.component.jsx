import React from 'react';

const WIDTH = 16;

const PlusIcon = () => (
  <svg
    width={WIDTH}
    height={WIDTH}
    viewBox={`0 0 ${WIDTH} ${WIDTH}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x={WIDTH / 2 - 1} width="2" height={WIDTH} fill="currentColor" />
    <rect y={WIDTH / 2 - 1} width={WIDTH} height="2" fill="currentColor" />
  </svg>
);

export default PlusIcon;
