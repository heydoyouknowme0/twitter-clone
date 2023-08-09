// auth.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  User,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
interface UserProps {
  uid: string;
  displayName: string | null;
  email: string | null;
  displayname: string;
  verified: boolean;
  avatar?: string;
  likes: string[];
}
interface PostData {
  text: string;
  image?: string[];
  likes: number;
  postRef: DocumentReference<DocumentData>;
  displayname: string;
  displayName: string;
  verified: boolean;
  avatar?: string;
}

type ValueProp = {
  user: UserProps | null;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<User>;
  signUpExt: (
    displayname: string,
    displayName: string,
    avatar: string,
    uid: string
  ) => Promise<void>;
  logOut: () => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
  postStack: PostData[];
  addToPostStack: (comment: PostData) => void;
  removeToPostStack: () => void;
  clearPostStack: () => void;
};

const UserAuthContext = createContext({} as ValueProp);

export function UserAuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [postStack, setPostStack] = useState<PostData[]>([]);

  function addToPostStack(comment: PostData) {
    setPostStack((prevPostStack) => [comment, ...prevPostStack]);
  }

  function removeToPostStack() {
    setPostStack((prevPostStack) => {
      const newPostStack = [...prevPostStack];
      newPostStack.shift();
      return newPostStack;
    });
  }

  function clearPostStack() {
    setPostStack([]);
  }
  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email: string, password: string, displayName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: displayName,
      });
      console.log("Display name set during signup!");
      return user;
    } catch (error) {
      console.error("Signup error or error setting display name:", error);
      throw error;
    }
  }
  async function signUpExt(
    displayname: string,
    displayName: string,
    avatar: string,
    uid: string
  ) {
    try {
      const userDocRef = doc(db, "users", uid);
      await setDoc(userDocRef, {
        displayname: displayname,
        displayName: displayName,
        avatar: avatar,
        verified: false,
      });
      console.log("Display name set during signup!");
    } catch (error) {
      console.error("Signup error or error setting display name:", error);
      throw error;
    }
  }
  function logOut() {
    setUser(null);
    return signOut(auth);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        console.log("User document:", currentUser.uid);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("User document data:", userData);
          setUser({
            displayname: userData.displayname,
            avatar: userData.avatar,
            verified: userData.verified,
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            likes: userData.likes,
          });
          console.log(user); // Set user state with both userData and currentUser
        } else {
          console.log("User document not found");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        signUpExt,
        postStack,
        addToPostStack,
        removeToPostStack,
        clearPostStack,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
