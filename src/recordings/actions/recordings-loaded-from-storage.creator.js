import type from './recordings-loaded-from-storage.type';
import createStandardAction from '../../utilities/create-standard-action';

const recordingsLoadedFromStorage = createStandardAction(type);

export default recordingsLoadedFromStorage;
