import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import BellIcon from './bell-icon.component';
import selectAlerts from './alerts.selector';
import userViewedAlerts from './actions/user-viewed-alerts.creator';
import XIcon from '../common/x-icon.component';
import ExternalLinkIcon from '../common/external-link-icon.component';
import noop from '../utilities/noop';
import pluck from '../utilities/pluck';
import Button from '../common/button.component';
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

const Alerts = () => {
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

  useEffect(() => {
    if (!isOpen || !containerRef.current) {
      return noop;
    }
    const handleDocumentClick = (event) => {
      if (!containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isOpen, containerRef, setIsOpen]);

  const hasUnread = Object.values(alerts).some(pluck('isUnread'));
  const hasLoud = hasUnread && Object.values(alerts).some(pluck('isLoud'));
  const wasUnreadRef = useRef(hasUnread);

  useEffect(() => {
    if (!hasUnread || wasUnreadRef.current === hasUnread || isOpen) {
      return;
    }
    wasUnreadRef.current = hasUnread;
    const mostRecentUnread = sortedAlerts.slice(-1);
  }, [hasUnread, isOpen, wasUnreadRef, sortedAlerts]);

  return (
    <div className="alerts" ref={containerRef}>
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
      </div>
      <button
        className={`alerts__button${
          hasUnread && !isOpen ? ' alerts__button--has-dot' : ''
        }${hasLoud && !isOpen ? ' alerts__button--is-loud' : ''}`}
        onClick={handleButtonClick}
      >
        {isOpen ? <XIcon /> : <BellIcon />}
      </button>
    </div>
  );
};

export default Alerts;
