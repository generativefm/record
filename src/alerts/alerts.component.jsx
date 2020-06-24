import React, { useState, useCallback, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import BellIcon from './bell-icon.component';
import selectAlerts from './alerts.selector';
import userViewedAlerts from './actions/user-viewed-alerts.creator';
import XIcon from '../common/x-icon.component';
import ExternalLinkIcon from '../common/external-link-icon.component';
import pluck from '../utilities/pluck';
import Button from '../common/button.component';
import useDismissable from '../common/use-dismissable.hook';
import './alerts.styles.scss';

const alertComparator = (a, b) => {
  if (a.isLoud === b.isLoud) {
    return a.timestamp - b.timestamp;
  } else if (a.isLoud) {
    return 1;
  }
  // b.isLoud
  return -1;
};

const Alerts = ({ shouldAdjustForFooter = false }) => {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const alerts = useSelector(selectAlerts);
  const sortedAlerts = useMemo(
    () => Object.values(alerts).sort(alertComparator),
    [alerts]
  );
  const visibleAlerts = sortedAlerts.slice(-5);
  const dispatch = useDispatch();
  const handleButtonClick = useCallback(() => {
    setIsOpen((previousValue) => !previousValue);
    const newlyReadAlertIds = visibleAlerts
      .filter(pluck('isUnread'))
      .map(pluck('id'));
    if (newlyReadAlertIds.length > 0) {
      dispatch(userViewedAlerts(newlyReadAlertIds));
    }
  }, [setIsOpen, dispatch, visibleAlerts]);

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
  }, []);

  useDismissable({
    isOpen,
    dismissableRef: containerRef,
    onDismiss: handleDismiss,
  });

  const hasUnread = Object.values(alerts).some(pluck('isUnread'));
  const hasLoudUnread =
    hasUnread &&
    Object.values(alerts).filter(pluck('isUnread')).some(pluck('isLoud'));

  return (
    <div
      className={`alerts${
        shouldAdjustForFooter ? ' alerts--above-footer' : ''
      }`}
      ref={containerRef}
    >
      <div className="alerts__messages">
        {visibleAlerts.map(
          ({ id, description, url, callToAction, isLoud, isExternal }, i) => {
            const timingMultiplier = isOpen ? visibleAlerts.length - i - 1 : i;
            const delay = timingMultiplier * 50;
            return (
              <CSSTransition
                key={id}
                in={isOpen}
                classNames="alerts__messages__item-"
                timeout={200 + delay}
                unmountOnExit
              >
                <div
                  className={`alerts__messages__item${
                    isLoud ? ' alerts__messages__item--is-loud' : ''
                  }`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  <div className="alerts__messages__item__description">
                    {description}
                  </div>
                  {url ? (
                    <a
                      className="alerts__messages__item__call-to-action"
                      href={url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {callToAction} {isExternal && <ExternalLinkIcon />}
                    </a>
                  ) : (
                    <Button className="button--link alerts__messages__item__call-to-action">
                      {callToAction} {isExternal && <ExternalLinkIcon />}
                    </Button>
                  )}
                </div>
              </CSSTransition>
            );
          }
        )}
        {visibleAlerts.length === 0 && (
          <CSSTransition
            in={isOpen}
            classNames="alerts__messages__item-"
            timeout={200}
            unmountOnExit
          >
            <div
              className="alerts__messages__item"
              style={{ transitionDelay: `${200}ms` }}
            >
              <div className="alerts__messages__item__description">
                No alerts
              </div>
            </div>
          </CSSTransition>
        )}
      </div>
      <button
        className={`alerts__button${
          hasUnread && !isOpen ? ' alerts__button--has-dot' : ''
        }${hasLoudUnread && !isOpen ? ' alerts__button--is-loud' : ''}`}
        onClick={handleButtonClick}
      >
        {isOpen ? <XIcon /> : <BellIcon />}
      </button>
    </div>
  );
};

Alerts.propTypes = {
  shouldAdjustForFooter: PropTypes.bool,
};

export default Alerts;
