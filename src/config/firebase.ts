import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBo6acXz9WoKwgJ1rUOtLqRuRvbw_aV0Bg",
  authDomain: "account-note-9f57d.firebaseapp.com",
  projectId: "account-note-9f57d",
  storageBucket: "account-note-9f57d.appspot.com",
  messagingSenderId: "1067689623075",
  appId: "1:1067689623075:web:a9fa179bde92e7154a3b96",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
