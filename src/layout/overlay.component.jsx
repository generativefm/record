import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './overlay.styles.scss';

const overlayDiv = document.getElementById('overlay-root');

const Overlay = ({ children }) => {
  return createPortal(
    <CSSTransition in={true} classNames="overlay-" timeout={200} appear>
      <div className="overlay">
        <div className="overlay__content">{children}</div>
      </div>
    </CSSTransition>,
    overlayDiv
  );
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Overlay;
