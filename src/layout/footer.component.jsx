import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import VolumeControl from '../volume/volume-control.component';
import PlayIcon from '../common/play-icon.component';
import StopIcon from '../common/stop-icon.component';
import Button from '../common/button.component';
import selectIsPlaying from '../playback/is-playing.selector';
import selectPlaybackTarget from '../playback/target.selector';
import PIECE from '../playback/piece.type';
import userClickedPlay from '../playback/actions/user-clicked-play.creator';
import userClickedStop from '../playback/actions/user-clicked-stop.creator';
import useIsRecording from '../recordings/use-is-recording.hook';
import './footer.styles.scss';

const NowPlaying = () => {
  const { id, type } = useSelector(selectPlaybackTarget);
  if (type !== PIECE || !byId[id]) {
    return null;
  }
  const { image, title } = byId[id];
  return (
    <div className="now-playing">
      <img src={image} className="now-playing__image" />
      <div className="now-playing__title">{title}</div>
    </div>
  );
};

const Footer = () => {
  const isPlaying = useSelector(selectIsPlaying);
  const dispatch = useDispatch();
  const { id } = useSelector(selectPlaybackTarget);
  const isRecording = useIsRecording();

  const handlePlaybackClick = useCallback(() => {
    if (!id) {
      return;
    }
    if (isPlaying) {
      dispatch(userClickedStop());
      return;
    }
    dispatch(userClickedPlay());
  }, [id, isPlaying, dispatch]);

  return (
    <footer className="footer">
      <div className="footer__left">
        <NowPlaying />
      </div>
      <div className="footer__center">
        {id && (
          <Button
            className="button--stroke"
            isDisabled={!id || isRecording}
            onClick={handlePlaybackClick}
          >
            {isPlaying ? <StopIcon width={20} /> : <PlayIcon width={20} />}
          </Button>
        )}
      </div>
      <div className="footer__right">
        <VolumeControl />
      </div>
    </footer>
  );
};

export default Footer;
