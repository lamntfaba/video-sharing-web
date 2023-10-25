// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZZ5IO0_KpExijylcmaZC8DBbe98w7iF4",
  authDomain: "video-sharing-34b84.firebaseapp.com",
  databaseURL: "https://video-sharing-34b84-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "video-sharing-34b84",
  storageBucket: "video-sharing-34b84.appspot.com",
  messagingSenderId: "1039689156116",
  appId: "1:1039689156116:web:9f403ae14aec5bee778901"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;