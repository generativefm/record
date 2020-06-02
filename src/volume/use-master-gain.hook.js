import { useContext } from 'react';
import MasterGainContext from './master-gain.context';

const useMasterGain = () => useContext(MasterGainContext);

export default useMasterGain;
