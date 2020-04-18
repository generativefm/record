import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.styles.scss';

const Header = () => (
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
    </nav>
  </header>
);

export default Header;
