import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";
import SubFeed from "./SubFeed";
import "./Feed.css";
import { Outlet, Route, Routes } from "react-router";
import OpenedTweet from "../openedTweet/OpenedTweet";
import { useUserAuth } from "../../auth";

interface UserData {
  displayname: string;
  displayName: string;
  avatar?: string;
  verified: boolean;
}

interface PosData {
  text: string;
  image?: string[];
  likes: number;
  userRef: DocumentReference<DocumentData>;
}
interface PostData {
  text: string;
  image?: string[];
  likes: number;
  userRef: DocumentReference<DocumentData>;
  postRef: DocumentReference<DocumentData>;
  displayname: string;
  displayName: string;
  verified: boolean;
  avatar?: string;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Initialize as true
  const { postStack } = useUserAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Set loading to true when fetching starts

      const postsCol = collection(db, "posts");
      const snapshot = await getDocs(postsCol);

      const postsData: PostData[] = [];

      for (const postDoc of snapshot.docs) {
        const postData = postDoc.data() as PosData;

        const userDoc = await getDoc(postData.userRef);
        const userData: UserData = userDoc.data() as UserData;

        const completePostData = {
          ...postData,
          postRef: postDoc.ref,
          displayName: userData.displayName,
          displayname: userData.displayname,
          verified: userData.verified,
          avatar: userData.avatar,
        };
        postsData.push(completePostData);
      }

      setPosts(postsData);
      setLoading(false); // Set loading to false when fetching is done
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed-con">
      <div className="feed">
        <Outlet />
        <Routes>
          <Route
            path="/"
            element={
              postStack[0] ? (
                <OpenedTweet {...postStack[0]} />
              ) : (
                <>
                  {loading ? (
                    <div className="center">
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                    </div>
                  ) : (
                    <SubFeed posts={posts} />
                  )}
                </>
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Feed;
