import RECORDINGS_OBJECT_STORE_NAME from './recordings-object-store-name';
import RECORDING_FILES_OBJECT_STORE_NAME from './recording-files-object-store-name';
import STATE_OBJECT_STORE_NAME from './state-object-store-name';

const DB_VERSION = 1;
const DB_NAME = '@generative-music/record::storage';

const attachUpgradeNeededHandler = (openRequest) => {
  const handleUpgradeNeeded = (event) => {
    openRequest.removeEventListener('upgradeneeded', handleUpgradeNeeded);
    const db = event.target.result;
    db.createObjectStore(RECORDINGS_OBJECT_STORE_NAME, {
      keyPath: 'recordingId',
    });
    db.createObjectStore(RECORDING_FILES_OBJECT_STORE_NAME);
    db.createObjectStore(STATE_OBJECT_STORE_NAME, { keyPath: 'key' });
  };
  openRequest.addEventListener('upgradeneeded', handleUpgradeNeeded);
};

const openDb = () =>
  new Promise((resolve) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    const handleSuccess = (event) => {
      request.removeEventListener('success', handleSuccess);
      resolve(event.target.result);
    };
    request.addEventListener('success', handleSuccess);
    attachUpgradeNeededHandler(request);
  });

export default openDb;
