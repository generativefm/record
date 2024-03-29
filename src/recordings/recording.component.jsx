import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import { SaveAlt as DownloadIcon, Add } from '@material-ui/icons';
import { IconButton } from '@generative.fm/web-ui';
import ProgressBar from './progress-bar.component';
import loadRecordingFile from '../storage/load-recording-file';
import userOpenedNewRecordingConfig from './actions/user-opened-new-recording-config.creator';
import useIsNarrowScreen from '../layout/use-is-narrow-screen.hook';
import './recording.styles.scss';

const formatSeconds = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 60 / 60);
  const hoursString = hours > 0 ? `${hours}h` : '';
  const subHourSeconds = totalSeconds - hours * 60 * 60;
  const minutes = Math.floor(subHourSeconds / 60);
  const minutesString = minutes > 0 ? `${minutes}m` : '';
  const seconds = Math.round(subHourSeconds - minutes * 60);
  const secondsString = seconds > 0 ? `${seconds}s` : '';
  return [hoursString, minutesString, secondsString].join('') || '0s';
};

const monthNames = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};

const Recording = ({
  recordingId,
  pieceId,
  length,
  queuedAt,
  fadeIn,
  fadeOut,
  progress,
  mimeType,
  onSave,
}) => {
  const dispatch = useDispatch();
  const isNarrowScreen = useIsNarrowScreen();

  const handleSaveClick = useCallback(() => {
    loadRecordingFile(recordingId).then((arrayBuffer) => {
      const url = URL.createObjectURL(
        new Blob([arrayBuffer], { type: mimeType })
      );
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', url);
      linkElement.setAttribute(
        'download',
        `${pieceId}-excerpt.${mimeType === 'audio/wav' ? 'wav' : 'ogg'}`
      );
      linkElement.click();
      if (typeof onSave === 'function') {
        onSave();
      }
    });
  }, [pieceId, recordingId, onSave, mimeType]);

  const handleNewRecordingClick = useCallback(() => {
    dispatch(userOpenedNewRecordingConfig(pieceId));
  }, [dispatch, pieceId]);

  const piece = byId[pieceId];
  if (!piece) {
    return null;
  }

  const { image, title } = piece;

  const recordingTitle = `${title} (Excerpt)`;

  if (isNarrowScreen) {
    return (
      <div className="recording">
        <img className="recording__image" src={image} />
        <div className="recording__info">
          <div className="recording__info__title">{recordingTitle}</div>
          {progress === 1 ? (
            <div className="recording__info__lengths">
              {[
                [length * 60, ''],
                [fadeIn, 'in'],
                [fadeOut, 'out'],
              ]
                .filter(([num]) => num > 0)
                .map(([num, suffix]) =>
                  `${formatSeconds(num)} ${suffix}`.trim()
                )
                .join(' · ')}
            </div>
          ) : (
            <div className="recording__info__progress">
              <ProgressBar progress={progress} />
              <div>{formatSeconds(length * 60 * (1 - progress))} left</div>
            </div>
          )}
        </div>
        <div className="recording__buttons">
          <IconButton
            title="Save"
            isDisabled={progress < 1}
            onClick={handleSaveClick}
          >
            <DownloadIcon />
          </IconButton>
          <IconButton title="New recording" onClick={handleNewRecordingClick}>
            <Add />
          </IconButton>
        </div>
      </div>
    );
  }

  return (
    <div className="recording">
      <div className="recording__info">
        <img className="recording__info__image" src={image} />
        <div className="recording__info__title">{recordingTitle}</div>
        {length > 0 ? (
          <div className="recording__info__length">
            {formatSeconds(length * 60)}
          </div>
        ) : null}
        {fadeIn > 0 ? (
          <div className="recording__info__fade-in">
            {formatSeconds(fadeIn)} in
          </div>
        ) : null}
        {fadeOut > 0 ? (
          <div className="recording__info__fade-out">
            {formatSeconds(fadeOut)} out
          </div>
        ) : null}
        <div className="recording__info__date">{formatDate(queuedAt)}</div>
        {progress < 1 ? (
          <div className="recording__info__progress">
            <ProgressBar progress={progress} />
            <div>{formatSeconds(length * 60 * (1 - progress))} left</div>
          </div>
        ) : null}
      </div>
      <div className="recording__buttons">
        <IconButton
          title="Save"
          isDisabled={progress < 1}
          onClick={handleSaveClick}
        >
          <DownloadIcon />
        </IconButton>
        <IconButton title="New recording" onClick={handleNewRecordingClick}>
          <Add />
        </IconButton>
      </div>
    </div>
  );
};

Recording.propTypes = {
  recordingId: PropTypes.string.isRequired,
  pieceId: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  queuedAt: PropTypes.number.isRequired,
  fadeIn: PropTypes.number.isRequired,
  fadeOut: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  mimeType: PropTypes.string.isRequired,
  onSave: PropTypes.func,
};

export default Recording;
