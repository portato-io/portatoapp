import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions, httpsCallable } from 'firebase/functions';

import { createStore} from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import {reducer} from "./Store/reducer"
import { IObjectInfo, ObjectInfoState } from './type';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "portatoapp.firebaseapp.com",
  databaseURL: "https://portatoapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "portatoapp",
  storageBucket: "portatoapp.appspot.com",
  messagingSenderId: "22027928847",
  appId: "1:22027928847:web:3588209ce56727486f2a7a",
  measurementId: "G-Y4VZJ8CMPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Functions
const functions = getFunctions(app);

const initialState: IObjectInfo = {
      name: 'test',
      description: "test",
      size:'test',
      weight:0,
      price:0,
      pickup_adress:"test",
      delivery_adress:"test",
      dateRange:["",""],
      time:"test"

}


const store = createStore(reducer,initialState);



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Mehdi: If we want the app to work offline, we need register,
// If not change to unregister()
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
