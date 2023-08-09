import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBBZ1PPyFaBkpbGD4Mj3NdS1PfaCQRH_ZM",
  authDomain: "twitter-clone-9eff1.firebaseapp.com",
  projectId: "twitter-clone-9eff1",
  storageBucket: "twitter-clone-9eff1.appspot.com",
  messagingSenderId: "244790141370",
  appId: "1:244790141370:web:e50e4d432a18bdecfa3d83",
  measurementId: "G-X0PMW40XQ6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
