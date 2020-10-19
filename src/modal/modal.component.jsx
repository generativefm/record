import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import useDismissable from '../common/use-dismissable.hook';
import './modal.styles.scss';

const Modal = ({ children, onDismiss }) => {
  const containerRef = useRef(null);

  useDismissable({
    onDismiss,
    dismissableRef: containerRef,
  });

  return (
    <div className="modal" ref={containerRef}>
      <CSSTransition in={true} classNames="animate-in-" timeout={200} appear>
        <div>{children}</div>
      </CSSTransition>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Modal;
