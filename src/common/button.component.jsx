import React from 'react';
import PropTypes from 'prop-types';
import './button.styles.scss';

const Button = ({ children, onClick, tooltip = '', className = '' }) => (
  <button
    type="button"
    className={['button', className].join(' ')}
    title={tooltip}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  tooltip: PropTypes.string,
};

export default Button;
