import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyDPNy5_B6fLpXSqAFgSCzh3coA5znJDk-I",
  authDomain: "simplechess-3dcce.firebaseapp.com",
  projectId: "simplechess-3dcce",
  storageBucket: "simplechess-3dcce.appspot.com",
  messagingSenderId: "54439659340",
  appId: "1:54439659340:web:32340d4f48285f981671e9"
};

const firebaseConfig = config;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;