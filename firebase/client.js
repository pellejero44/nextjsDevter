import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  collection,
  addDoc,
  Timestamp,
  getFirestore,
  getDocs,
  orderBy,
} from 'firebase/firestore';
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user;
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
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

export const addDevit = ({ avatar, content, userId, userName }) => {
  return addDoc(collection(db, 'devits'), {
    avatar,
    content,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestDevits = () => {
  return getDocs(collection(db, 'devits'), orderBy('createdAt', 'desc')).then(
    ({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        };
      });
    }
  );
};

export const uploadImage = (file) => {
  const storage = getStorage();
  const imagesRef = ref(storage, `images/${file.name}`);
  const task = uploadBytes(imagesRef, file);
  return task;
};

export const downloadImage = (ref) => getDownloadURL(ref);
