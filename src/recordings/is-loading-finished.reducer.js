import RECORDINGS_LOADED_FROM_STORAGE from './actions/recordings-loaded-from-storage.type';

const isLoadingFinishedReducer = (state = false, action) =>
  state || action.type === RECORDINGS_LOADED_FROM_STORAGE;

export default isLoadingFinishedReducer;
