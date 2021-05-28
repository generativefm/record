import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import {
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Add,
  Album,
} from '@material-ui/icons';
import { IconButton } from '@generative.fm/web-ui';
import MasterGainControl from '../volume/master-gain-control.component';
import selectIsPlaying from '../playback/is-playing.selector';
import selectPlaybackTarget from '../playback/target.selector';
import PIECE from '../playback/piece.type';
import userClickedPlay from '../playback/actions/user-clicked-play.creator';
import userClickedStop from '../playback/actions/user-clicked-stop.creator';
import userOpenedNewRecordingConfig from '../recordings/actions/user-opened-new-recording-config.creator';
import selectIsRecording from '../recordings/is-recording.selector';
import useMasterGain from '../volume/use-master-gain.hook';
import useIsNarrowScreen from './use-is-narrow-screen.hook';
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
  const { id, type } = useSelector(selectPlaybackTarget);
  const isRecording = useSelector(selectIsRecording);
  const masterGain = useMasterGain();
  const isNarrowScreen = useIsNarrowScreen();

  const handlePlaybackClick = useCallback(() => {
    if (!id) {
      return;
    }
    if (isPlaying) {
      dispatch(userClickedStop());
      return;
    }
    dispatch(userClickedPlay({ id, type, destinationNode: masterGain }));
  }, [id, type, isPlaying, dispatch, masterGain]);

  const handleNewRecordingClick = useCallback(() => {
    dispatch(userOpenedNewRecordingConfig(id));
  }, [dispatch, id]);

  const isValidId = id && type === PIECE && Boolean(byId[id]);
  const bandcampUrl = isValidId && byId[id].bandcampUrl;

  return (
    <footer
      className={`footer${isNarrowScreen ? ' footer--without-volume' : ''}`}
    >
      <div className="footer__left">
        <NowPlaying />
      </div>
      <div className={isNarrowScreen ? 'footer__right' : 'footer__center'}>
        {isValidId && (
          <>
            <IconButton
              title={isPlaying ? 'Stop' : 'Play'}
              isDisabled={!id || isRecording}
              onClick={handlePlaybackClick}
            >
              {isPlaying ? <StopIcon /> : <PlayIcon />}
            </IconButton>
            {bandcampUrl && (
              <IconButton href={bandcampUrl} title="Official recordings">
                <Album />
              </IconButton>
            )}
            <IconButton
              title="New recording"
              isDisabled={!id}
              onClick={handleNewRecordingClick}
            >
              <Add />
            </IconButton>
          </>
        )}
      </div>
      {!isNarrowScreen && (
        <div className="footer__right">
          <MasterGainControl />
        </div>
      )}
    </footer>
  );
};

export default Footer;
