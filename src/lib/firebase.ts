import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey || 'AIzaSyDummyKey',
  authDomain: firebaseConfigData.authDomain || 'sony-photography-sirhind.firebaseapp.com',
  projectId: firebaseConfigData.projectId || 'sony-photography-sirhind',
  storageBucket: firebaseConfigData.storageBucket || 'sony-photography-sirhind.appspot.com',
  messagingSenderId: firebaseConfigData.messagingSenderId || '184895724278',
  appId: firebaseConfigData.appId || '1:184895724278:web:81048109sirhind',
  measurementId: firebaseConfigData.measurementId || 'G-SONYSIRHIND',
};

// Initialize Firebase App safely
export let app: FirebaseApp;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} catch (e) {
  console.warn('Firebase app init warning:', e);
  app = !getApps().length ? initializeApp(firebaseConfig, 'sony-app') : getApp('sony-app');
}

// Initialize Cloud Firestore using the provisioned database ID
const databaseId = firebaseConfigData.firestoreDatabaseId || '(default)';
export let db: Firestore;
try {
  db = getFirestore(app, databaseId);
} catch (e) {
  console.warn('Firestore instance init warning, falling back to default:', e);
  db = getFirestore(app);
}

export const FIREBASE_PROJECT_ID = firebaseConfigData.projectId || 'sony-photography-sirhind';
export const FIRESTORE_DB_NAME = databaseId;

