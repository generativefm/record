import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { byId } from '@generative-music/pieces-alex-bainter';
import record from '@generative-music/web-recorder';
import { Dialog } from '@generative.fm/web-ui';
import selectNewRecordingId from './new-recording-id.selector';
import userCanceledNewRecording from './actions/user-canceled-new-recording.creator';
import userRequestedNewRecording from './actions/user-requested-new-recording.creator';
import './new-recording.styles.scss';

const InputRow = ({ label, unit, value, onChange, isAutoFocused = false }) => {
  const handleChange = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );
  return (
    <div className="input-row">
      <div className="input-row__label">{label}</div>
      <div className="input-row__input-container">
        <input
          size="3"
          type="number"
          min="0"
          onChange={handleChange}
          value={value}
          autoFocus={isAutoFocused}
        />
      </div>
      <div className="input-row__unit">{unit}</div>
    </div>
  );
};

InputRow.propTypes = {
  label: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isAutoFocused: PropTypes.bool,
};

const NewRecording = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isOnRecordingsPage = Boolean(useRouteMatch('/recordings'));
  const newRecordingId = useSelector(selectNewRecordingId);
  const [length, setLength] = useState('');
  const [fadeIn, setFadeIn] = useState('');
  const [fadeOut, setFadeOut] = useState('');

  const parsedLength = Number.parseFloat(length, 10);
  const isValidLength = !Number.isNaN(parsedLength) && parsedLength > 0;
  const piece = byId[newRecordingId];

  const dispatchCancelAction = useCallback(() => {
    dispatch(userCanceledNewRecording());
  }, [dispatch]);

  const handleStartClick = useCallback(() => {
    dispatch(
      userRequestedNewRecording({
        fadeIn,
        fadeOut,
        pieceId: newRecordingId,
        length: parsedLength,
      })
    );
    if (!isOnRecordingsPage) {
      history.push('/recordings');
    }
  }, [
    dispatch,
    fadeIn,
    fadeOut,
    parsedLength,
    history,
    isOnRecordingsPage,
    newRecordingId,
  ]);

  const actions = useMemo(
    () => [
      { text: 'Cancel' },
      { text: 'Start', onClick: handleStartClick, isDisabled: !isValidLength },
    ],
    [handleStartClick, isValidLength]
  );

  if (!record.isSupported) {
    return (
      <Dialog title="Not supported" onDismiss={dispatchCancelAction}>
        <div className="new-recording">
          Sorry, the browser you&apos;re using doesn&apos;t currently support
          this service. Premade recordings are available{' '}
          <a href={piece.bandcampUrl}>on Bandcamp</a>.
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog
      title="New recording"
      onDismiss={dispatchCancelAction}
      actions={actions}
    >
      <div className="new-recording__piece">
        <img className="new-recording__piece__image" src={piece.image} />
        <div className="new-recording__piece__title">{piece.title}</div>
      </div>
      <div className="new-recording__inputs">
        <InputRow
          label="Length"
          unit="minutes"
          value={length}
          onChange={setLength}
          isAutoFocused
        />
        <InputRow
          label="Fade in"
          unit="seconds"
          value={fadeIn}
          onChange={setFadeIn}
        />
        <InputRow
          label="Fade out"
          unit="seconds"
          value={fadeOut}
          onChange={setFadeOut}
        />
      </div>
      <div
        className={`new-recording__estimate ${
          isValidLength ? 'is-shown' : 'is-hidden'
        }`}
      >
        This will take about {parsedLength} minute
        {parsedLength > 1 ? 's' : ''}
      </div>
    </Dialog>
  );
};

export default NewRecording;
