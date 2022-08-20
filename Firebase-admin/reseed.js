const {
  getAuthUsers,
  deleteAuthUsers,
  deleteFireStoreUsers,
  createUsers,
  deleteFirestoreEvents,
  createFirestoreEvents,
} = require('./services');

getAuthUsers()
  .then((userRecords) => deleteAuthUsers(userRecords))
  .then(() => deleteFireStoreUsers())
  .then(() => createUsers())
  .then(() => deleteFirestoreEvents())
  .then(() => createFirestoreEvents())
  .catch((error) => console.log(error));
