import type from './recording-progress-updated.type';
import createStandardAction from '../../utilities/create-standard-action';

const recordingProgressUpdated = ({ recordingId, progress, title }) =>
  createStandardAction(type)({ recordingId, progress, title });

export default recordingProgressUpdated;
