import RECORDINGS_OBJECT_STORE_NAME from './recordings-object-store-name';
import openDb from './open-db';
import promisifyTransaction from './promisify-transaction';

const loadRecordings = () =>
  openDb().then((db) =>
    promisifyTransaction(
      db
        .transaction([RECORDINGS_OBJECT_STORE_NAME])
        .objectStore(RECORDINGS_OBJECT_STORE_NAME)
        .getAll()
    )
  );

export default loadRecordings;
