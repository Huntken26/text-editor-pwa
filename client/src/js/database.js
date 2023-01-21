import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


// Added logic that accepts some content and adds it to the database. Utilized some code from the mini project and customized it


// Export a function we will use to PUT to the database.
export const putDb = async (content) => {
  console.log('PUT to the database');
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // New transaction which specifies the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');
   // Open up the desired object store.
  const store = tx.objectStore('jate');
   // Use the .put method to get all data in the database.
  const request = store.put({ id: 1, value: content });
  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// Exporting a function used to GET to the database.
export const getDb = async () => {
  console.log('GET from the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.get(1);

  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
  
  return result?.value;
}

initdb();
