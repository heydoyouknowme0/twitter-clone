import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  DocumentReference,
  DocumentData,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import SubFeed from "./SubFeed";
import "./Feed.css";
import { Outlet, Route, Routes } from "react-router";
import OpenedTweet from "../openedTweet/OpenedTweet";
import { useUserAuth } from "../../auth";

interface PosData {
  text: string;
  image?: string[];
  likes: number;
  userRef: DocumentReference<DocumentData>;
}
interface PostData extends PosData {
  postRef: DocumentReference<DocumentData>;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { postStack, user, users } = useUserAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      const postsCol = collection(db, "posts");
      const snapshot = await getDocs(postsCol);

      const posts = snapshot.docs.map((doc) => {
        const postRef = doc.ref;
        return {
          ...(doc.data() as PosData),
          postRef,
        };
      });
      setPosts(posts);
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
                    <SubFeed postes={posts} />
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
