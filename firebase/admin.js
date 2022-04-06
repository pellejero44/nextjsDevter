import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
const admin = require('firebase-admin');

// const serviceAccount = require('./firebase-keys.json');
const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CONFIG);

let app;
try {
  app = initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (e) {}

const db = getFirestore(app);

export const getDevit = (id) => db.collection('devits').doc(id).get();
