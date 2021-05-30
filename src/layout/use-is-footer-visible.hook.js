import { useSelector } from 'react-redux';
import selectPlaybackTarget from '../playback/target.selector';

const useIsFooterVisible = () => {
  const { id } = useSelector(selectPlaybackTarget);
  return Boolean(id);
};

export default useIsFooterVisible;
