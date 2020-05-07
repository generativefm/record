import RECORDING_FILES_OBJECT_STORE_NAME from './recording-files-object-store-name';
import openDb from './open-db';
import promisifyTransaction from './promisify-transaction';

const loadRecordings = (recordingId) =>
  openDb().then((db) =>
    promisifyTransaction(
      db
        .transaction([RECORDING_FILES_OBJECT_STORE_NAME])
        .objectStore(RECORDING_FILES_OBJECT_STORE_NAME)
        .get(recordingId)
    )
  );

export default loadRecordings;
