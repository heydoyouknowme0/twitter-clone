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
  CollectionReference,
} from "firebase/firestore";
interface OtheUserProps {
  avatar?: string;
  displayname: string;
  displayName: string;
  verified: boolean;
  following: string[];
}
interface OtherUserProps extends OtheUserProps {
  userRef: DocumentReference<DocumentData>;
}
interface UserProps {
  uid: string;
  displayName: string | null;
  email: string | null;
  displayname: string;
  verified: boolean;
  avatar?: string;
  likes: string[];
  following: string[];
}
interface PostData {
  text: string;
  image?: string[];
  likes: number;
  userRef: DocumentReference<DocumentData>;
  postRef: DocumentReference<DocumentData>;
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
  likeCollection: CollectionReference<DocumentData, DocumentData>;
  users: OtherUserProps[];
};

const UserAuthContext = createContext({} as ValueProp);

export function UserAuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [postStack, setPostStack] = useState<PostData[]>([]);
  const [users, setUsers] = useState<OtherUserProps[]>([]);
  const likeCollection = collection(db, "likes");

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
      const newerUser: UserProps = {
        uid: userCredential.user.uid,
        displayName: displayName,
        email: email,
        displayname: displayName,
        verified: false,
        likes: [],
        following: [],
      };
      setUser(newerUser);
      console.log(newerUser);
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
        following: [],
      });
      user
        ? setUser({
            ...user,
            displayname: displayname,
            avatar: avatar,
            verified: false,
          })
        : setUser(null);
      console.log("Display name set during signup!");
      console.log(user);
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
    const fetchUsers = async () => {
      const usersCol = collection(db, "users");
      const snapshot = await getDocs(usersCol);

      const userss = snapshot.docs.map((doc) => {
        const userRef = doc.ref;
        return {
          ...(doc.data() as OtheUserProps),
          userRef,
        };
      });

      setUsers(userss);
    };
    fetchUsers();
  }, []);
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
            following: userData.following,
          });
          console.log(user); // Set user state with both userData and currentUser
        } else {
          console.log("In process");
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
        likeCollection,
        users,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
