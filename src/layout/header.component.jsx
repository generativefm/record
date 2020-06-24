import React, { useState, useCallback, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import useIsNarrowScreen from './use-is-narrow-screen.hook';
import MenuIcon from './menu-icon.component';
import Button from '../common/button.component';
import useDismissable from '../common/use-dismissable.hook';
import './header.styles.scss';

const Header = () => {
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
      <>
        <header className="header header--is-narrow header--is-unshadowed">
          <div className="header__title">
            <Button
              className="button--change-background header__title__part"
              onClick={toggleIsDrawerOpen}
            >
              <MenuIcon />
            </Button>
            <div className="header__title__part">
              {pathname && pathname.charAt(1).toUpperCase() + pathname.slice(2)}
            </div>
          </div>
        </header>
        <CSSTransition
          in={isDrawerOpen}
          classNames="nav-drawer--animated-"
          timeout={200}
          unmountOnExit
        >
          <div className="nav-drawer" ref={navDrawerRef}>
            <div className="nav-drawer__title">Generative.fm Record</div>
            <nav className="nav-drawer__nav">
              <NavLink
                to="/browse"
                className="nav-drawer__nav__item"
                activeClassName="nav-drawer__nav__item--active"
              >
                Browse
              </NavLink>
              <NavLink
                to="/recordings"
                className="nav-drawer__nav__item"
                activeClassName="nav-drawer__nav__item--active"
              >
                Recordings
              </NavLink>
              <NavLink
                to="/licensing"
                className="nav-drawer__nav__item"
                activeClassName="nav-drawer__nav__item--active"
              >
                Licensing
              </NavLink>
              <NavLink
                to="/donate"
                className="nav-drawer__nav__item"
                activeClassName="nav-drawer__nav__item--active"
              >
                Donate <span className="heart" />
              </NavLink>
            </nav>
          </div>
        </CSSTransition>
      </>
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
          Donate <span className="heart" />
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
