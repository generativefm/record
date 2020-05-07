import openDb from './open-db';
import RECORDINGS_OBJECT_STORE_NAME from './recordings-object-store-name';
import RECORDING_FILES_OBJECT_STORE_NAME from './recording-files-object-store-name';
import promisifyTransaction from './promisify-transaction';

const saveRecording = (recording, arrayBuffer) =>
  openDb().then((db) => {
    const transaction = db.transaction(
      [RECORDINGS_OBJECT_STORE_NAME, RECORDING_FILES_OBJECT_STORE_NAME],
      'readwrite'
    );
    return Promise.all(
      [
        transaction.objectStore(RECORDINGS_OBJECT_STORE_NAME).put(recording),
        transaction
          .objectStore(RECORDING_FILES_OBJECT_STORE_NAME)
          .put(arrayBuffer, recording.recordingId),
      ].map(promisifyTransaction)
    );
  });

export default saveRecording;
