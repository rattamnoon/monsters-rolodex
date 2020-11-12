import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDXtTkO_YhhYNDDA7FgjqblSdZ8RpffM54",
    authDomain: "crwn-db-248e8.firebaseapp.com",
    databaseURL: "https://crwn-db-248e8.firebaseio.com",
    projectId: "crwn-db-248e8",
    storageBucket: "crwn-db-248e8.appspot.com",
    messagingSenderId: "684891411419",
    appId: "1:684891411419:web:379a34ef6d72e85f71cdfe",
    measurementId: "G-B4R3DSPW6C"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;