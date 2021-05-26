import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TopBar, BottomNav, SnackbarProvider } from '@generative.fm/web-ui';
import { MusicNote, QueueMusic, Gavel, Favorite } from '@material-ui/icons';
import Search from '../search/search.component';
import Content from './content.component';
import NewRecording from '../recordings/new-recording.component';
import Footer from './footer.component';
import selectNewRecordingId from '../recordings/new-recording-id.selector';
import useIsNarrowScreen from './use-is-narrow-screen.hook';
import useIsFooterVisible from './use-is-footer-visible.hook';
import './layout.styles.scss';

const NAV_LINKS = [
  {
    label: 'Browse',
    to: '/browse',
    Icon: MusicNote,
  },
  {
    label: 'Recordings',
    to: '/recordings',
    Icon: QueueMusic,
  },
  {
    label: 'Licensing',
    to: '/licensing',
    Icon: Gavel,
  },
  {
    label: 'Donate',
    to: '/donate',
    Icon: Favorite,
  },
];

const Layout = () => {
  const isBrowsing = Boolean(useRouteMatch('/browse'));
  const isUserConfiguringNewRecording = Boolean(
    useSelector(selectNewRecordingId)
  );
  const isNarrowScreen = useIsNarrowScreen();
  const shouldRenderFooter = useIsFooterVisible();

  let snackbarOffsetRems = 0;
  if (shouldRenderFooter) {
    snackbarOffsetRems += 5;
  }
  if (isNarrowScreen) {
    snackbarOffsetRems += 4;
  }

  return (
    <SnackbarProvider bottomOffset={`${snackbarOffsetRems}rem`}>
      <div
        className={`layout${isBrowsing ? ' layout--with-search' : ''}${
          shouldRenderFooter ? '' : ' layout--without-footer'
        }`}
      >
        <div className="top-bar">
          <TopBar productName="Record" navLinks={NAV_LINKS} />
        </div>
        {isBrowsing && <Search />}
        <div className="layout__content">
          <Content />
        </div>
        {shouldRenderFooter && <Footer />}
        {isNarrowScreen && (
          <div className="bottom-nav">
            <BottomNav navLinks={NAV_LINKS} />
          </div>
        )}
      </div>
      {isUserConfiguringNewRecording && <NewRecording />}
    </SnackbarProvider>
  );
};

export default Layout;
