import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN ,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID ,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET ,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID ,
    appId: process.env.NEXT_PUBLIC_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app)
const provider  = new GoogleAuthProvider()

export {
    auth,
    provider,
    signInWithPopup,
    signOut,
    db
}