import pluck from '../utilities/pluck';
import pipe from '../utilities/pipe';

const selectIsLoadingFinished = pipe(
  ...['recording', 'isLoadingFinished'].map(pluck)
);

export default selectIsLoadingFinished;
