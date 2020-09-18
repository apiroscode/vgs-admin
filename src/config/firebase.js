import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0m8JjGy5JZSpLA_Iw02EI3s0ntfP1v48",
  authDomain: "vgs-online-69991.firebaseapp.com",
  databaseURL: "https://vgs-online-69991.firebaseio.com",
  projectId: "vgs-online-69991",
  storageBucket: "vgs-online-69991.appspot.com",
  messagingSenderId: "413617081022",
  appId: "1:413617081022:web:840c7273877c6210a7acef",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const fieldValue = firebase.firestore.FieldValue;
