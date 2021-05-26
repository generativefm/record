import { v4 as uuid } from 'uuid';
import type from './user-requested-new-recording.type';
import createStandardAction from '../../utilities/create-standard-action';

const parsedFloatOr0 = (num) => {
  const parsedFloat = Number.parseFloat(num, 10);
  if (Number.isNaN(parsedFloat)) {
    return 0;
  }
  return parsedFloat;
};

const userRequestedNewRecordingConfig = ({
  pieceId,
  length,
  fadeIn,
  fadeOut,
}) =>
  createStandardAction(type)(
    {
      pieceId,
      length,
      fadeIn: parsedFloatOr0(fadeIn),
      fadeOut: parsedFloatOr0(fadeOut),
      recordingId: uuid(),
      queuedAt: Date.now(),
    },
    {
      snackbar: {
        message: 'Recording queued',
      },
    }
  );

export default userRequestedNewRecordingConfig;
