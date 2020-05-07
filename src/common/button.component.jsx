import React from 'react';
import PropTypes from 'prop-types';
import './button.styles.scss';

const Button = ({
  children,
  onClick,
  tooltip = '',
  className = '',
  isDisabled = false,
}) => (
  <button
    type="button"
    className={['button', className]
      .concat(isDisabled ? ['button--is-disabled'] : [])
      .join(' ')}
    title={tooltip}
    onClick={onClick}
    disabled={isDisabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  tooltip: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default Button;
