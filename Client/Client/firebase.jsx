// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

// our web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDONuYo9g4jfFAJ5kWJho3fdCD_KGTdA80",
    authDomain: "intellectcoin.firebaseapp.com",
    projectId: "intellectcoin",
    storageBucket: "intellectcoin.appspot.com",
    messagingSenderId: "426551575152",
    appId: "1:426551575152:web:e46fe1b41f4b5d43442ab5",
    measurementId: "G-WCJCSPTQ0N"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
// Initialize the authentication ()
export const auth = getAuth(app)
// Initialize the storage
export const storage = getStorage(app)
// Initialize the Firestore database
export const db = getFirestore(app)
