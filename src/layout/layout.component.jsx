import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './header.component';
import Search from '../search/search.component';
import Content from './content.component';
import Overlay from './overlay.component';
import NewRecording from '../recordings/new-recording.component';
import Footer from './footer.component';
import Alerts from '../alerts/alerts.component';
import selectNewRecordingId from '../recordings/new-recording-id.selector';
import useIsNarrowScreen from './use-is-narrow-screen.hook';
import selectPlaybackTarget from '../playback/target.selector';
import './layout.styles.scss';

const Layout = () => {
  const isBrowsing = Boolean(useRouteMatch('/browse'));
  const isUserConfiguringNewRecording = Boolean(
    useSelector(selectNewRecordingId)
  );
  const isNarrowScreen = useIsNarrowScreen();
  const { id } = useSelector(selectPlaybackTarget);

  const shouldRenderFooter = !isNarrowScreen || id;

  return (
    <>
      <div
        className={`layout${isBrowsing ? ' layout--with-search' : ''}${
          shouldRenderFooter ? '' : ' layout--without-footer'
        }`}
      >
        <Header />
        {isBrowsing && <Search />}
        <div className="layout__content">
          <Content />
        </div>
        {isUserConfiguringNewRecording && (
          <div className="layout__overlay">
            <Overlay>
              <NewRecording />
            </Overlay>
          </div>
        )}
        {shouldRenderFooter && <Footer />}
      </div>
      <Alerts shouldAdjustForFooter={shouldRenderFooter} />
    </>
  );
};

export default Layout;
