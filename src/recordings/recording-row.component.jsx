import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import Button from '../common/button.component';
import DownloadIcon from './download-icon.component';
import PlusIcon from '../common/plus-icon.component';
import loadRecordingFile from '../storage/load-recording-file';
import userOpenedNewRecordingConfig from './actions/user-opened-new-recording-config.creator';
import './recording-row.styles.scss';

const formatSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const leftoverSeconds = Math.round(seconds - minutes * 60);
  return `${minutes
    .toString()
    .padStart(2, '0')}:${leftoverSeconds.toString().padStart(2, '0')}`;
};

const ProgressBar = ({ progress }) => (
  <div className="progress-bar">
    <div
      className="progress-bar__fill"
      style={{ width: `${progress * 100}%` }}
    ></div>
  </div>
);

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
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

const RecordingRow = ({ recording }) => {
  const {
    recordingId,
    pieceId,
    length,
    fadeIn,
    fadeOut,
    progress,
    queuedAt,
  } = recording;
  const { title, image } = byId[pieceId];

  const dispatch = useDispatch();

  const handleSaveClick = useCallback(() => {
    loadRecordingFile(recordingId).then((arrayBuffer) => {
      const url = URL.createObjectURL(
        new Blob([arrayBuffer], { type: 'audio/ogg; codecs=opus' })
      );
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', url);
      linkElement.setAttribute('download', `${pieceId}-excerpt.ogg`);
      linkElement.click();
    });
  }, [pieceId, recordingId]);

  const handleNewRecordingClick = useCallback(() => {
    dispatch(userOpenedNewRecordingConfig(pieceId));
  }, [dispatch, pieceId]);

  return (
    <tr key={recordingId} className="recording-row">
      <td className="recording-row__img">
        <img src={image} />
      </td>
      <td className="recording-row__title">{title} (Excerpt)</td>
      <td>{formatSeconds(length * 60)}</td>
      <td>{formatSeconds(fadeIn)}</td>
      <td>{formatSeconds(fadeOut)}</td>

      {progress < 1 ? (
        <>
          <td className="recording-row__progress">
            <ProgressBar progress={progress} length={length} />
          </td>
          <td>{formatSeconds(length * 60 * (1 - progress))} left</td>
        </>
      ) : (
        <>
          <td>recorded {formatDate(queuedAt)}</td>
          <td>
            <audio />
          </td>
        </>
      )}
      <td className="recording-row__buttons">
        <div className="recording-row__buttons__container">
          <Button
            className="button--change-background"
            tooltip="Save"
            isDisabled={progress < 1}
            onClick={handleSaveClick}
          >
            <DownloadIcon />
          </Button>
          <Button
            className="button--change-background"
            tooltip="New recording"
            onClick={handleNewRecordingClick}
          >
            <PlusIcon />
          </Button>
        </div>
      </td>
    </tr>
  );
};

RecordingRow.propTypes = {
  recording: PropTypes.shape({
    recordingId: PropTypes.string.isRequired,
    pieceId: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    fadeIn: PropTypes.number.isRequired,
    fadeOut: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    queuedAt: PropTypes.number.isRequired,
  }).isRequired,
};

export default RecordingRow;
