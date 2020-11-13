import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDXtTkO_YhhYNDDA7FgjqblSdZ8RpffM54",
  authDomain: "crwn-db-248e8.firebaseapp.com",
  databaseURL: "https://crwn-db-248e8.firebaseio.com",
  projectId: "crwn-db-248e8",
  storageBucket: "crwn-db-248e8.appspot.com",
  messagingSenderId: "684891411419",
  appId: "1:684891411419:web:379a34ef6d72e85f71cdfe",
  measurementId: "G-B4R3DSPW6C",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
