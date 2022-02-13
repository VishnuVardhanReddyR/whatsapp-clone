import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDLezsMT3plioMVqlRHimQ7uMaZPcUkWk4",
    authDomain: "whatsapp-clone-ecdf8.firebaseapp.com",
    projectId: "whatsapp-clone-ecdf8",
    storageBucket: "whatsapp-clone-ecdf8.appspot.com",
    messagingSenderId: "315642579116",
    appId: "1:315642579116:web:ce7a8bec52b4c4bebaf709"
  };

const app = !firebase.apps.length 
    ? firebase.initializeApp(firebaseConfig) 
    : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };