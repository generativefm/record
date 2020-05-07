import React from 'react';
import pieces from '@generative-music/pieces-alex-bainter';
import Volume from '../controls/volume.component';
import PlayIcon from '../common/play-icon.component';
import PauseIcon from '../common/pause-icon.component';
import Button from '../common/button.component';
import './footer.styles.scss';

const [piece] = pieces;

const NowPlaying = () => (
  <div className="now-playing">
    <img src={piece.image} className="now-playing__image" />
    <div className="now-playing__title">{piece.title}</div>
  </div>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__left">
        <NowPlaying />
      </div>
      <div className="footer__center">
        <Button className="button--stroke">
          <PlayIcon width={20} />
        </Button>
      </div>
      <div className="footer__right">
        <Volume />
      </div>
    </footer>
  );
};

export default Footer;
