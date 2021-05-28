import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { byId } from '@generative-music/pieces-alex-bainter';
import record from '@generative-music/web-recorder';
import { Dialog, DurationInput } from '@generative.fm/web-ui';
import selectNewRecordingId from './new-recording-id.selector';
import userCanceledNewRecording from './actions/user-canceled-new-recording.creator';
import userRequestedNewRecording from './actions/user-requested-new-recording.creator';
import './new-recording.styles.scss';

const InputRow = ({ label, value, onChange, isAutoFocused = false }) => {
  return (
    <div className="input-row">
      <div className="input-row__label">{label}</div>
      <div className="input-row__duration-input">
        <DurationInput
          onChange={onChange}
          value={value}
          isAutoFocused={isAutoFocused}
        ></DurationInput>
      </div>
    </div>
  );
};

InputRow.propTypes = {
  label: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  isAutoFocused: PropTypes.bool,
};

const NewRecording = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isOnRecordingsPage = Boolean(useRouteMatch('/recordings'));
  const newRecordingId = useSelector(selectNewRecordingId);
  const [length, setLength] = useState();
  const [fadeIn, setFadeIn] = useState();
  const [fadeOut, setFadeOut] = useState();

  const isValidLength = !Number.isNaN(length) && length > 0;
  const piece = byId[newRecordingId];

  const dispatchCancelAction = useCallback(() => {
    dispatch(userCanceledNewRecording());
  }, [dispatch]);

  const handleStartClick = useCallback(() => {
    dispatch(
      userRequestedNewRecording({
        fadeIn: fadeIn / 1000,
        fadeOut: fadeOut / 1000,
        length: length / (60 * 1000),
        pieceId: newRecordingId,
      })
    );
    if (!isOnRecordingsPage) {
      history.push('/recordings');
    }
  }, [
    dispatch,
    fadeIn,
    fadeOut,
    history,
    isOnRecordingsPage,
    newRecordingId,
    length,
  ]);

  const actions = useMemo(
    () => [
      { text: 'Cancel' },
      {
        text: 'Add to queue',
        onClick: handleStartClick,
        isDisabled: !isValidLength,
      },
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
    </Dialog>
  );
};

export default NewRecording;
