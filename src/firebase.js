import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCZlU-Ge_IO04zHkwPtOa-mn_KcNGVGQLE",
  authDomain: "wedding-4aa72.firebaseapp.com",
  projectId: "wedding-4aa72",
  storageBucket: "wedding-4aa72.appspot.com",
  messagingSenderId: "884594085715",
  appId: "1:884594085715:web:05d38a616961d693339ba6"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };