import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCOVgf8RwBJy7WFZgMrKmtOswx_0wlBHeg",
  authDomain: "learning-sep-2019-react-spa.firebaseapp.com",
  databaseURL: "https://learning-sep-2019-react-spa.firebaseio.com",
  projectId: "learning-sep-2019-react-spa",
  storageBucket: "",
  messagingSenderId: "147339282321",
  appId: "1:147339282321:web:2cf05657dfd9fe5188bc30"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;