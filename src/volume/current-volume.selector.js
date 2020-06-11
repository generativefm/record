import pipe from '../utilities/pipe';
import pluck from '../utilities/pluck';
import selectVolume from './volume.selector';

const selectCurrentVolume = pipe(selectVolume, pluck('currentValue'));

export default selectCurrentVolume;
