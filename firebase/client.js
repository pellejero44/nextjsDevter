import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAETWcWQ2g72O-8WVAZmK_ukiaHyN-Tvwo',
  authDomain: 'devter-c4868.firebaseapp.com',
  projectId: 'devter-c4868',
  storageBucket: 'devter-c4868.appspot.com',
  messagingSenderId: '32923759936',
  appId: '1:32923759936:web:6a7fa67eaee42955eb36a5',
  measurementId: 'G-G9QZNS9FYH',
};

initializeApp(firebaseConfig);

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user;
  return {
    avatar: photoURL,
    username: displayName,
    email,
  };
};

export const _onAuthStateChanged = (onChange) => {
  const auth = getAuth();
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider();
  const auth = getAuth();
  console.log(githubProvider);
  return signInWithPopup(auth, githubProvider);
};
