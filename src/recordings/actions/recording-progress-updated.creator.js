import type from './recording-progress-updated.type';
import createStandardAction from '../../utilities/create-standard-action';

const recordingProgressUpdated = ({ recordingId, progress, title }) =>
  createStandardAction(type)(
    { recordingId, progress, title },
    { shouldSentryIgnore: progress !== 0 && progress !== 1 }
  );

export default recordingProgressUpdated;
