import { useSelector } from 'react-redux';
import useIsNarrowScreen from './use-is-narrow-screen.hook';
import selectPlaybackTarget from '../playback/target.selector';

const useIsFooterVisible = () => {
  const isNarrowScreen = useIsNarrowScreen();
  const { id } = useSelector(selectPlaybackTarget);
  return Boolean(!isNarrowScreen || id);
};

export default useIsFooterVisible;
