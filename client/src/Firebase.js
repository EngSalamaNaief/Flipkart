//import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAEFb3KaBGKoO9BNT8gn6wjD3CF6JeguAQ",
  authDomain: "netflix-690ce.firebaseapp.com",
  projectId: "netflix-690ce",
  storageBucket: "netflix-690ce.appspot.com",
  messagingSenderId: "1078108424906",
  appId: "1:1078108424906:web:749d360f291877d58d4233"
};

// Initialize Firebase
//Firebase.initializeApp(firebaseConfig);
const app=initializeApp(firebaseConfig);
//const Storage=firebase.storage();
const Storage=getStorage(app);
console.log("storage",Storage)
export default Storage;