// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAFhsvKCxzA2NwnAKQcTfm86IClAqAeM4",
  authDomain: "image-gallery-809f7.firebaseapp.com",
  projectId: "image-gallery-809f7",
  storageBucket: "image-gallery-809f7.appspot.com",
  messagingSenderId: "450379385583",
  appId: "1:450379385583:web:fc66a387c99a54dd26691a"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
