import pipe from '../utilities/pipe';
import pluck from '../utilities/pluck';

const selectIsPlaying = pipe(...['playback', 'status', 'isPlaying'].map(pluck));

export default selectIsPlaying;
