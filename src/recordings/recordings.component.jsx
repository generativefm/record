import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import selectRecordings from './recordings.selector';
import RecordingRow from './recording-row.component';
import './recordings.styles.scss';

const Recordings = () => {
  const recordings = useSelector(selectRecordings);
  const sortedRecordings = useMemo(
    () => Object.values(recordings).sort((a, b) => b.queuedAt - a.queuedAt),
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
        {sortedRecordings.map((recording) => (
          <RecordingRow key={recording.recordingId} recording={recording} />
        ))}
      </tbody>
    </table>
  );
};

export default Recordings;
