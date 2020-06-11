import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import selectRecordings from './recordings.selector';
import RecordingRow from './recording-row.component';
import selectIsLoadingFinished from './is-loading-finished.selector';
import './recordings.styles.scss';

const Recordings = () => {
  const recordings = useSelector(selectRecordings);
  const isLoadingFinished = useSelector(selectIsLoadingFinished);
  const sortedRecordings = useMemo(
    () => Object.values(recordings).sort((a, b) => b.queuedAt - a.queuedAt),
    [recordings]
  );

  if (sortedRecordings.length === 0) {
    return (
      <div className="recordings recordings--empty">
        {isLoadingFinished ? (
          <>
            No recordings saved. Create one from the{' '}
            <Link to="/browse">Browse page</Link>.
          </>
        ) : (
          'Looking for saved recordings...'
        )}
      </div>
    );
  }

  return (
    <table className="recordings">
      <thead className="recordings__header">
        <tr>
          <th>Title</th>
          <th></th>
          <th>Length</th>
          <th>Fade in</th>
          <th>Fade out</th>
          <th>Status</th>
          <th></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedRecordings.map((recording) => (
          <RecordingRow key={recording.recordingId} recording={recording} />
        ))}
      </tbody>
    </table>
  );
};

export default Recordings;
