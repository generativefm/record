import RECORDINGS_OBJECT_STORE_NAME from './recordings-object-store-name';
import RECORDING_FILES_OBJECT_STORE_NAME from './recording-files-object-store-name';
import openDb from './open-db';
import promisifyTransaction from './promisify-transaction';

const loadRecordings = () =>
  openDb()
    .then((db) =>
      Promise.all([
        promisifyTransaction(
          db
            .transaction([RECORDINGS_OBJECT_STORE_NAME])
            .objectStore(RECORDINGS_OBJECT_STORE_NAME)
            .getAll()
        ),
        promisifyTransaction(
          db
            .transaction([RECORDING_FILES_OBJECT_STORE_NAME])
            .objectStore(RECORDING_FILES_OBJECT_STORE_NAME)
            .getAllKeys()
        ),
      ])
    )
    .then(([recordings, recordingFileKeys]) => {
      const recordingFileKeySet = new Set(recordingFileKeys);
      return recordings.filter(({ recordingId }) =>
        recordingFileKeySet.has(recordingId)
      );
    });

export default loadRecordings;
