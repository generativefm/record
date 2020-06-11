import selectRecordings from './recordings.selector';
import pipe from '../utilities/pipe';

const isRecording = (recordings) =>
  Object.values(recordings).some(({ progress }) => progress < 1);

const selectIsRecording = pipe(selectRecordings, isRecording);

export default selectIsRecording;
