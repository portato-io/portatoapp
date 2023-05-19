import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'portatoapp.firebaseapp.com',
  databaseURL:
    'https://portatoapp-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'portatoapp',
  storageBucket: 'portatoapp.appspot.com',
  messagingSenderId: '22027928847',
  appId: '1:22027928847:web:3588209ce56727486f2a7a',
  measurementId: 'G-Y4VZJ8CMPY',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize and export Firebase Functions
export const functions = getFunctions(app);

// Get a reference to the Realtime Database service
export const database = getDatabase(app);

export const auth = getAuth();

export const storage = getStorage(app);
