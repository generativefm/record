import React, { useMemo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import selectRecordings from './recordings.selector';
import Recording from './recording.component';
import selectIsLoadingFinished from './is-loading-finished.selector';
import DonationPrompt from '../donate/donation-prompt';
import selectIsPromptAllowed from '../donate/is-prompt-allowed.selector';
import './recordings.styles.scss';

const Recordings = () => {
  const recordings = useSelector(selectRecordings);
  const isLoadingFinished = useSelector(selectIsLoadingFinished);
  const isPromptAllowed = useSelector(selectIsPromptAllowed);
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  const sortedRecordings = useMemo(
    () => Object.values(recordings).sort((a, b) => b.queuedAt - a.queuedAt),
    [recordings]
  );

  const handleSave = useCallback(() => {
    if (isPromptAllowed) {
      setIsPromptVisible(true);
    }
  }, [isPromptAllowed]);

  const hidePrompt = useCallback(() => {
    setIsPromptVisible(false);
  }, []);

  if (sortedRecordings.length === 0) {
    return (
      <div className="recordings recordings--is-empty text-content">
        {isLoadingFinished ? (
          <>
            No recordings saved. Create one from the{' '}
            <Link to="/browse">Browse page</Link>.
          </>
        ) : (
          'Loading saved recordings...'
        )}
      </div>
    );
  }

  return (
    <>
      <div className="recordings">
        {sortedRecordings.map((recording) => (
          <Recording
            key={recording.recordingId}
            onSave={handleSave}
            {...recording}
          />
        ))}
      </div>
      {isPromptVisible && <DonationPrompt onDismiss={hidePrompt} />}
    </>
  );
};

export default Recordings;
