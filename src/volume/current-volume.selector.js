import pluck from '../utilities/pluck';
import pipe from '../utilities/pipe';

const selectCurrentVolume = pipe(...['volume', 'currentValue'].map(pluck));

export default selectCurrentVolume;
