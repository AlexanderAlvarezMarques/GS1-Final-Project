import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBA_KEVb8kHAEqFJHQNyfloh9YecPLBSrs",
    authDomain: "gs1-project-a2d2a.firebaseapp.com",
    databaseURL: "https://gs1-project-a2d2a.firebaseio.com",
    projectId: "gs1-project-a2d2a",
    storageBucket: "gs1-project-a2d2a.appspot.com",
    messagingSenderId: "145374141673",
    appId: "1:145374141673:web:20a7755aa658ac6ec82478",
    measurementId: "G-WJ2HRTQ56K"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();