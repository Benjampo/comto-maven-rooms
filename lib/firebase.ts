// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjJqT-6JQVXc-No94mqDk3cb7NfCFD4Ao",
    authDomain: "com-to-maven-room.firebaseapp.com",
    projectId: "com-to-maven-room",
    storageBucket: "com-to-maven-room.appspot.com",
    messagingSenderId: "826232190166",
    appId: "1:826232190166:web:0b3d29dda7f43439f80577"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
