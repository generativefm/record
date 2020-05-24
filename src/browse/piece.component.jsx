import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import Button from '../common/button.component';
import PlusIcon from '../common/plus-icon.component';
import PlayIcon from '../common/play-icon.component';
import userOpenedNewRecordingConfig from '../recordings/actions/user-opened-new-recording-config.creator';
import userPickedTarget from '../playback/actions/user-picked-target.creator';
import PIECE from '../playback/piece.type';
import './piece.styles.scss';

const Piece = ({ id }) => {
  const dispatch = useDispatch();
  const handleNewRecordingClick = useCallback(() => {
    dispatch(userOpenedNewRecordingConfig(id));
  }, [dispatch, id]);
  const handlePlayClick = useCallback(() => {
    dispatch(userPickedTarget({ id, type: PIECE }));
  }, [dispatch, id]);
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
          tooltip="Play"
          onClick={handlePlayClick}
        >
          <PlayIcon width={16} />
        </Button>
        <Button
          className="button--change-background piece__buttons__button"
          tooltip="New recording"
          onClick={handleNewRecordingClick}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

Piece.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Piece;
