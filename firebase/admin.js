import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
const admin = require('firebase-admin');

const serviceAccount = require('./firebase-keys.json');

let app;
try {
  app = initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (e) {}

const db = getFirestore(app);

export const getDevit = (id) => db.collection('devits').doc(id).get();
