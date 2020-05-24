import pipe from '../utilities/pipe';
import pluck from '../utilities/pluck';

const selectTarget = pipe(...['playback', 'target'].map(pluck));

export default selectTarget;
