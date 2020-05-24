import React from 'react';

const CopyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="5"
      y="5"
      width="14"
      height="14"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect width="15" height="2" fill="currentColor" />
    <rect
      x="2"
      width="15"
      height="2"
      transform="rotate(90 2 0)"
      fill="currentColor"
    />
  </svg>
);

export default CopyIcon;
