import pluck from '../utilities/pluck';
import pipe from '../utilities/pipe';

const selectNewRecordingId = pipe(
  ...['recording', 'newRecordingId'].map(pluck)
);

export default selectNewRecordingId;
