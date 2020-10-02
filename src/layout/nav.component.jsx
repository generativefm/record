import React, { useState, useCallback, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MusicNote as BrowseIcon,
  QueueMusic as RecordingsIcon,
  Gavel as LicensingIcon,
  Favorite as DonateIcon,
} from '@material-ui/icons';
import useIsNarrowScreen from './use-is-narrow-screen.hook';
import useDismissable from '../common/use-dismissable.hook';
import './nav.styles.scss';

const Nav = () => {
  const isNarrowScreen = useIsNarrowScreen();
  const { pathname } = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navDrawerRef = useRef(null);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  const toggleIsDrawerOpen = useCallback(() => {
    setIsDrawerOpen((previousValue) => !previousValue);
  }, []);

  useDismissable({
    isOpen: isDrawerOpen,
    dismissableRef: navDrawerRef,
    onDismiss: toggleIsDrawerOpen,
  });

  if (isNarrowScreen) {
    return (
      <nav className="nav--narrow">
        <NavLink
          to="/browse"
          className="nav--narrow__item"
          activeClassName="nav--narrow__item--active"
        >
          <BrowseIcon />
          <span>Browse</span>
        </NavLink>
        <NavLink
          to="/recordings"
          className="nav--narrow__item"
          activeClassName="nav--narrow__item--active"
        >
          <RecordingsIcon />
          <span>Recordings</span>
        </NavLink>
        <NavLink
          to="/licensing"
          className="nav--narrow__item"
          activeClassName="nav--narrow__item--active"
        >
          <LicensingIcon />
          <span>Licensing</span>
        </NavLink>
        <NavLink
          to="/donate"
          className="nav--narrow__item"
          activeClassName="nav--narrow__item--active"
        >
          <DonateIcon />
          <span>Donate</span>
        </NavLink>
      </nav>
    );
  }

  return (
    <header className="header">
      <div className="header__title">Generative.fm Record</div>
      <nav className="header__nav">
        <NavLink
          to="/browse"
          className="header__nav__item"
          activeClassName="header__nav__item--active"
        >
          Browse
        </NavLink>
        <NavLink
          to="/recordings"
          className="header__nav__item"
          activeClassName="header__nav__item--active"
        >
          Recordings
        </NavLink>
        <NavLink
          to="/licensing"
          className="header__nav__item"
          activeClassName="header__nav__item--active"
        >
          Licensing
        </NavLink>
        <NavLink
          to="/donate"
          className="header__nav__item"
          activeClassName="header__nav__item--active"
        >
          Donate
        </NavLink>
      </nav>
    </header>
  );
};

export default Nav;
