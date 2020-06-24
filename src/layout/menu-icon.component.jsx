import React from 'react';
import PropTypes from 'prop-types';

const MenuIcon = ({ className = '' } = {}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect y="3" width="20" height="2" fill="currentColor" />
    <rect y="9" width="20" height="2" fill="currentColor" />
    <rect y="15" width="20" height="2" fill="currentColor" />
  </svg>
);

MenuIcon.propTypes = {
  className: PropTypes.string,
};

export default MenuIcon;
