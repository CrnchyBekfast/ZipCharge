// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALsdyml82Py5-vQGovrg5G4z-CCEqHJ70",
  authDomain: "zipcharge-f8e9d.firebaseapp.com",
  databaseURL: "https://zipcharge-f8e9d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zipcharge-f8e9d",
  storageBucket: "zipcharge-f8e9d.firebasestorage.app",
  messagingSenderId: "1069657685756",
  appId: "1:1069657685756:web:898d0b5f1cdff78c54a179",
  measurementId: "G-BFFTQ4JF2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);