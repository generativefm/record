import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import selectRecordings from './recordings.selector';

const useIsRecording = () => {
  const recordings = useSelector(selectRecordings);
  return useMemo(
    () => Object.values(recordings).some(({ progress }) => progress < 1),
    [recordings]
  );
};

export default useIsRecording;
