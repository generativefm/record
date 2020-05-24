import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { byId } from '@generative-music/pieces-alex-bainter';
import selectNewRecordingId from './new-recording-id.selector';
import Button from '../common/button.component';
import userCanceledNewRecordingType from './actions/user-canceled-new-recording.creator';
import userRequestedNewRecording from './actions/user-requested-new-recording.creator';
import noop from '../utilities/noop';
import './new-recording.styles.scss';

const InputRow = ({ label, unit, value, onChange }) => {
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
};

const NewRecording = () => {
  const containerRef = useRef(null);
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
    dispatch(userCanceledNewRecordingType());
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
  }, [dispatch, length, fadeIn, fadeOut]);

  useEffect(() => {
    if (!containerRef.current) {
      return noop;
    }
    const handleDocumentClick = (event) => {
      if (!containerRef.current.contains(event.target)) {
        dispatchCancelAction();
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [dispatchCancelAction, containerRef]);

  return (
    <div className="new-recording" ref={containerRef}>
      <CSSTransition in={true} classNames="animate-in-" timeout={20000} appear>
        <div>
          <div className="new-recording__title">New recording</div>
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
          <div className="new-recording__buttons">
            <Button className="button--text" onClick={dispatchCancelAction}>
              Cancel
            </Button>
            <Button
              className="button--text button--primary"
              isDisabled={!isValidLength}
              tooltip={
                isValidLength ? 'Start recording' : "Something isn't ready"
              }
              onClick={handleStartClick}
            >
              Start
            </Button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default NewRecording;
