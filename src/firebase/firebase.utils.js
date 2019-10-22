import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDuuq9QibLV5l_dqMcPV9OpeFu9qh5NZa4",
    authDomain: "crown-db-3ace0.firebaseapp.com",
    databaseURL: "https://crown-db-3ace0.firebaseio.com",
    projectId: "crown-db-3ace0",
    storageBucket: "crown-db-3ace0.appspot.com",
    messagingSenderId: "270108214507",
    appId: "1:270108214507:web:74533f51adca42b88feaae",
    measurementId: "G-KGE7BLSG0W"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
   if (!userAuth) return;
   
   const userRef = firestore.doc(`users/${userAuth.uid}`);

   const snapShot = await userRef.get();

   if(!snapShot.exists) {
    const { displayName, email } =userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
   }

   return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
