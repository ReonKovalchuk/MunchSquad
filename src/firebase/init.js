// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDhroPMVjoVebNvEOLK_aXopvZZrEZBDN8',
  authDomain: 'munchsquad-6078e.firebaseapp.com',
  projectId: 'munchsquad-6078e',
  storageBucket: 'munchsquad-6078e.appspot.com',
  messagingSenderId: '916951981919',
  appId: '1:916951981919:web:fd90adaa5c4dcd351de0ea'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// initialize store
export const firestore = getFirestore(app)
export const auth = getAuth()
