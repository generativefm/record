import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import {
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  AddCircle as AddIcon,
} from '@material-ui/icons';
import Button from '../common/button.component';
import userOpenedNewRecordingConfig from '../recordings/actions/user-opened-new-recording-config.creator';
import userClickedPlay from '../playback/actions/user-clicked-play.creator';
import userClickedStop from '../playback/actions/user-clicked-stop.creator';
import PIECE from '../playback/piece.type';
import selectPlaybackTarget from '../playback/target.selector';
import selectIsPlaying from '../playback/is-playing.selector';
import useMasterGain from '../volume/use-master-gain.hook';
import './piece.styles.scss';

const Piece = ({ id, isPlayable }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector(selectIsPlaying);
  const playbackTarget = useSelector(selectPlaybackTarget);
  const masterGain = useMasterGain();
  const isCurrentlyPlaying =
    playbackTarget.type === PIECE && playbackTarget.id === id && isPlaying;
  const handleNewRecordingClick = useCallback(() => {
    dispatch(userOpenedNewRecordingConfig(id));
  }, [dispatch, id]);
  const handlePlaybackClick = useCallback(() => {
    const action = isCurrentlyPlaying
      ? userClickedStop()
      : userClickedPlay({ id, type: PIECE, destinationNode: masterGain });
    dispatch(action);
  }, [dispatch, id, isCurrentlyPlaying, masterGain]);
  const { title, image } = byId[id];
  return (
    <div className="piece">
      <div className="piece__info">
        <img src={image} className="piece__info__image" />
        <div className="piece__info__title">{title}</div>
      </div>
      <div className="piece__buttons">
        <Button
          className="button--change-background piece__buttons__button"
          tooltip={isCurrentlyPlaying ? 'Stop' : 'Play'}
          onClick={handlePlaybackClick}
          isDisabled={!isPlayable}
        >
          {isCurrentlyPlaying ? (
            <StopIcon style={{ width: 30, height: 30 }} />
          ) : (
            <PlayIcon style={{ width: 30, height: 30 }} />
          )}
        </Button>
        <Button
          className="button--change-background piece__buttons__button"
          tooltip="New recording"
          onClick={handleNewRecordingClick}
        >
          <AddIcon style={{ width: 30, height: 30 }} />
        </Button>
      </div>
    </div>
  );
};

Piece.propTypes = {
  id: PropTypes.string.isRequired,
  isPlayable: PropTypes.bool.isRequired,
};

export default Piece;
