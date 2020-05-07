import type from './recording-progress-updated.type';
import createStandardAction from '../../utilities/create-standard-action';

const recordingProgressUpdated = ({ recordingId, progress }) =>
  createStandardAction(type)({ recordingId, progress });

export default recordingProgressUpdated;
