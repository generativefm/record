import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tone from 'tone';
import { useSelector } from 'react-redux';
import useIsNarrowScreen from '../layout/use-is-narrow-screen.hook';
import selectCurrentVolume from './current-volume.selector';
import MasterGainContext from './master-gain.context';

const MasterGainProvider = ({ children }) => {
  const currentVolume = useSelector(selectCurrentVolume);
  const gainNodeRef = useRef(new Tone.Gain(currentVolume).toMaster());
  const isNarrowScreen = useIsNarrowScreen();

  useEffect(() => {
    if (
      currentVolume !== null &&
      typeof currentVolume !== 'undefined' &&
      gainNodeRef.current.gain.value !== currentVolume
    ) {
      gainNodeRef.current.set({ gain: currentVolume });
    }
  }, [currentVolume]);

  useEffect(() => {
    gainNodeRef.current.set({ gain: 1 });
  }, [isNarrowScreen]);

  return (
    <MasterGainContext.Provider value={gainNodeRef.current}>
      {children}
    </MasterGainContext.Provider>
  );
};

MasterGainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MasterGainProvider;
