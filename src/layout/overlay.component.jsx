import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './overlay.styles.scss';

const Overlay = ({ children }) => (
  <CSSTransition in={true} classNames="overlay-" timeout={200} appear>
    <div className="overlay">{children}</div>
  </CSSTransition>
);

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Overlay;
