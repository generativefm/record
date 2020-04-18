import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Header from './header.component';
import Search from './search/search.component';
import Content from './content.component';
import Footer from './footer.component';
import './layout.styles.scss';

const Layout = () => {
  const isBrowsing = Boolean(useRouteMatch('/browse'));

  return (
    <div className={`layout${isBrowsing ? ' layout--with-search' : ''}`}>
      <Header />
      {isBrowsing && <Search />}
      <div className="layout__content">
        <Content />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
