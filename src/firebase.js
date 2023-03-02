// import firebase from 'firebase';

// v9 compat packages are API compatible with v8 code
import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore" 
import {getAuth,GoogleAuthProvider} from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-h1W6aB1XrqQ7wfOqdwyhNEwX32UKkE0",
  authDomain: "discord-clone-908f7.firebaseapp.com",
  projectId: "discord-clone-908f7",
  storageBucket: "discord-clone-908f7.appspot.com",
  messagingSenderId: "719473320677",
  appId: "1:719473320677:web:e4cecea8f1a5601864ea0c",
  measurementId: "G-RSE53NF7P5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// const firebaseApp = firebase.initializepp(firebaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;