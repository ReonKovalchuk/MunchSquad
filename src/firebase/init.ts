// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import 'firebase/firestore'

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
export const firebaseApp = initializeApp(firebaseConfig)
// initialize store
export const firestore = getFirestore(firebaseApp)
// export const auth = getAuth()

firestore
