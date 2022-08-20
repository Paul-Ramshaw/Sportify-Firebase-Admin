const admin = require('firebase-admin');
const serviceAccount = require('../admin-key.json');
const { firestore } = require('firebase-admin');
const { users, events } = require('../data');
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = firestore();

function getAuthUsers() {
  return admin
    .auth()
    .listUsers(1000)
    .then((listUsersResult) => {
      return listUsersResult.users;
    });
}

function deleteAuthUsers(userRecords) {
  const promises = [];
  userRecords.forEach((userRecord) => {
    console.log('getting here');
    promises.push(admin.auth().deleteUser(userRecord.uid));
  });
  return Promise.all(promises);
}

function deleteFireStoreUsers() {
  return admin
    .firestore()
    .collection('users')
    .get()
    .then((userDocs) => {
      const promises = [];
      userDocs.forEach((userDoc) => {
        promises.push(db.collection('users').doc(userDoc.id).delete());
      });
      return promises;
    });
}

function createUsers() {
  // create Auth user
  users.forEach((user) => {
    return admin
      .auth()
      .createUser({
        email: user.email,
        password: 'test123',
      })
      .then((userRecord) => {
        // create Firestore user
        admin
          .firestore()
          .collection('users')
          .doc(userRecord.uid)
          .set({
            testuid: user.testuid,
            uid: userRecord.uid,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            DOB: user.DOB,
            location: user.location,
            sports: user.sports,
            friends: user.friends,
            following: user.following,
            followers: user.followers,
            events: user.events,
            wishlist: user.wishlist,
            hostRating: user.hostRating,
            photoURL: user.photoURL,
          })
          .then(() => {
            console.log(
              `Successfully added ${user.username} to Auth and firestore`
            );
          });
      });
  });
}

function deleteFirestoreEvents() {
  return admin
    .firestore()
    .collection('events')
    .get()
    .then((eventDocs) => {
      const promises = [];
      eventDocs.forEach((eventDoc) => {
        promises.push(db.collection('events').doc(eventDoc.id).delete());
      });
      return promises;
    });
}

function createFirestoreEvents() {
  events.forEach((event) => {
    admin
      .firestore()
      .collection('events')
      .add({
        capacity: event.capacity,
        date: event.date,
        description: event.description,
        location: event.location,
        level: event.level,
        participants: event.participants,
        title: event.title,
        type: event.type,
        hostUsername: event.hostUsername,
        tags: event.tags,
        geolocation: event.geolocation,
        photoURL: event.photoURL,
      })
      .then(() => {
        console.log(`Successfully added ${event.title} to firestore`);
      });
  });
}

module.exports = {
  getAuthUsers,
  deleteAuthUsers,
  deleteFireStoreUsers,
  createUsers,
  deleteFirestoreEvents,
  createFirestoreEvents,
};
