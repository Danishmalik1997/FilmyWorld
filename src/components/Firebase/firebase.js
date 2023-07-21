import { initializeApp } from "firebase/app";
import {collection, getFirestore,} from 'firebase/firestore'; 
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDr8Vj-tC0Ncp73NBH4mP1ewrba6ONd2Wc",
  authDomain: "filmyworld2023-2fb0c.firebaseapp.com",
  projectId: "filmyworld2023-2fb0c",
  storageBucket: "filmyworld2023-2fb0c.appspot.com",
  messagingSenderId: "666332957826",
  appId: "1:666332957826:web:1db6bf8bb7ed0e7693789b"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const moviesRef = collection(db,'movies')
export const reviewsRef = collection(db, 'reviews')
export const usersRef = collection(db, 'users')

export default app; 