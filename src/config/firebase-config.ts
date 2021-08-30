import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBI945QtjZpk6unB4kEjO8yXrTfYbcGR-s",
  authDomain: "roto6-306206.firebaseapp.com",
  projectId: "roto6-306206",
  storageBucket: "roto6-306206.appspot.com",
  messagingSenderId: "813429112553",
  appId: "1:813429112553:web:0ecd1115377aff3e8cfa78",
  measurementId: "G-1LQJ28Y6RC"
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

export default db;
