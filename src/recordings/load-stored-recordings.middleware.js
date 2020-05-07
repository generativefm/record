import recordingsLoadedFromStorage from './actions/recordings-loaded-from-storage.creator';
import loadRecordings from '../storage/load-recordings';

const loadStoredRecordingsMiddleware = (store) => (next) => {
  loadRecordings().then((storedRecordings) => {
    store.dispatch(recordingsLoadedFromStorage(storedRecordings));
  });
  return (action) => next(action);
};

export default loadStoredRecordingsMiddleware;
