import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import Button from '../common/button.component';
import selectRecordings from './recordings.selector';
import DownloadIcon from './download-icon.component';
import PlusIcon from '../common/plus-icon.component';
import loadRecordingFile from '../storage/load-recording-file';
import './recordings.styles.scss';

const formatSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const leftoverSeconds = Math.round(seconds - minutes * 60);
  return `${minutes
    .toString()
    .padStart(2, '0')}:${leftoverSeconds.toString().padStart(2, '0')}`;
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

const ProgressBar = ({ progress }) => (
  <div className="progress-bar">
    <div
      className="progress-bar__fill"
      style={{ width: `${progress * 100}%` }}
    ></div>
  </div>
);

const Recordings = () => {
  const recordings = useSelector(selectRecordings);
  const sortedRecordings = useMemo(
    () => Object.values(recordings).sort((a, b) => b.queuedAt - a.queuedAt),
    [recordings]
  );

  const handleSaveClick = useCallback(
    (recordingId) => {
      loadRecordingFile(recordingId).then((arrayBuffer) => {
        const recording = recordings[recordingId];
        const url = URL.createObjectURL(
          new Blob([arrayBuffer], { type: 'audio/ogg; codecs=opus' })
        );
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', url);
        linkElement.setAttribute(
          'download',
          `${recording.pieceId}-excerpt.ogg`
        );
        linkElement.click();
      });
    },
    [recordings]
  );

  return (
    <table className="recordings">
      <thead className="recordings__header">
        <tr>
          <th></th>
          <th>Title</th>
          <th>Length</th>
          <th>Fade in</th>
          <th>Fade out</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedRecordings.map(
          ({
            recordingId,
            pieceId,
            length,
            fadeIn,
            fadeOut,
            progress,
            queuedAt,
          }) => {
            const { title, image } = byId[pieceId];
            return (
              <tr key={recordingId} className="recordings__row">
                <td className="recordings__row__img">
                  <img src={image} />
                </td>
                <td className="recordings__row__title">{title} (Excerpt)</td>
                <td>{formatSeconds(length * 60)}</td>
                <td>{formatSeconds(fadeIn)}</td>
                <td>{formatSeconds(fadeOut)}</td>

                {progress < 1 ? (
                  <>
                    <td className="recordings__row__progress">
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
                <td className="recordings__row__buttons">
                  <div className="recordings__row__buttons__container">
                    <Button
                      className="button--change-background"
                      tooltip="Save"
                      isDisabled={progress < 1}
                      onClick={() => handleSaveClick(recordingId)}
                    >
                      <DownloadIcon />
                    </Button>
                    <Button
                      className="button--change-background"
                      tooltip="New recording"
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

export default Recordings;
