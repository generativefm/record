import openDb from './open-db';
import STATE_OBJECT_STORE_NAME from './state-object-store-name';
import promisifyTransaction from './promisify-transaction';

const loadStoredStateValues = () =>
  openDb().then((db) =>
    promisifyTransaction(
      db
        .transaction([STATE_OBJECT_STORE_NAME])
        .objectStore(STATE_OBJECT_STORE_NAME)
        .getAll()
    )
  );

export default loadStoredStateValues;
