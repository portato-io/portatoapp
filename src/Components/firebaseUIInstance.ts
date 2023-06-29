import firebase from 'firebase/app';
import { auth } from '../firebaseConfig';
import * as firebaseui from 'firebaseui';
import { GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';

const uiConfig = {
  signInOptions: [EmailAuthProvider.PROVIDER_ID],
  callbacks: {},
};
const uiInstance = new firebaseui.auth.AuthUI(auth);

export { uiInstance, uiConfig };
