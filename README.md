# Sportify-Firebase-Admin

This application is intended to be used alongside Sportify. It should only be used in a sportify firebase test environment. Sportify-Firebase-Admin can be used to (re)seed the **test** firebase Authentication and firestore databases for Sportify.  Sportify-Firebase-Admin will repopulate the Firebase Authentication and Firestore databases with sample user and event data.

## Important

This application uses the firebase-admin SDK.  It requires service account credentials to access the databases.  Make sure that those credentials are not exposed in the client-side sportify app, and that they are .gitignored in the Sportify-Firebase-Admin.  Also, make sure to only use those credentials for the test environment for your sportify project.

## Getting started

To run this application on your local machine, you'll need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/download/) installed. Then take the following steps:

1. Clone the repository to your local machine

```
$ git clone https://github.com/Paul-Ramshaw/Sportify-Firebase-Admin.git
```

2. Go into the repository

```
$ cd Sportify-Firebase-Admin
```

3. Install all the required dependencies

```
$ npm install
```

4. Seed or reseed the database 

```
$ npm run seed
```

## Sportify

To run Sportify you will need to set up a project on firebase with Authentication, a Firestore database and cloud storage.
More information about sportify can be found here: https://github.com/Paul-Ramshaw/sportify.  

## Firebase-Admin Configuration

In order to (re)seed the firebase authentication and firestore databases, a configuration file with your firebase service account's credentials will also need to be added to the root of the Sportify-Firebase-admin project.  Add a file named "admin-key.json" containing the test environments service account credentials to the root of the Sportify-Firebase-admin project.  Make sure that the file containing the firebase configuration file is gitignored.

## Dependencies

- [firebase-admin](https://www.npmjs.com/package/firebase-admin)

