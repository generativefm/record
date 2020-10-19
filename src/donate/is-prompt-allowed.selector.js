import pluck from '../utilities/pluck';
import pipe from '../utilities/pipe';

const selectIsPromptAllowed = pipe(...['donate', 'isPromptAllowed'].map(pluck));

export default selectIsPromptAllowed;
