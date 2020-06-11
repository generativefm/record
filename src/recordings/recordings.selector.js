import pluck from '../utilities/pluck';
import pipe from '../utilities/pipe';

const selectRecordings = pipe(...['recording', 'recordings'].map(pluck));

export default selectRecordings;
