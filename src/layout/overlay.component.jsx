import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import useIsFooterVisible from './use-is-footer-visible.hook';
import './overlay.styles.scss';

const Overlay = ({ children }) => {
  const isFooterVisible = useIsFooterVisible();
  return (
    <CSSTransition in={true} classNames="overlay-" timeout={200} appear>
      <div
        className={`overlay${isFooterVisible ? ' overlay--above-footer' : ''}`}
      >
        {children}
      </div>
    </CSSTransition>
  );
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Overlay;
