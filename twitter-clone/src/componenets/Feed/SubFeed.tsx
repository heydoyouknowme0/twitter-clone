import React, { useEffect, useRef, useState } from "react";
import "./Feed.css";
import {
  DocumentData,
  DocumentReference,
  collection,
} from "firebase/firestore";

import { useUserAuth } from "../../auth";
import { useNavigate } from "react-router";
import TweetFeed from "./TweetFeed";
import { db } from "../../firebase";

interface PostData {
  text: string;
  image?: string[];
  likes: number;
  userRef: DocumentReference<DocumentData>;
  postRef: DocumentReference<DocumentData>;
}

interface SubFeedProps {
  postes: PostData[];
}

const SubFeed: React.FC<SubFeedProps> = ({ postes }) => {
  const { user } = useUserAuth();
  const [feedSelectbox, setFeedSelectbox] = useState("For You");
  const [posts, setPosts] = useState<PostData[]>(postes);
  const { clearPostStack, addToPostStack } = useUserAuth();
  useEffect(() => {
    clearPostStack();
    if (feedSelectbox === "Following" && user) {
      const filteredPosts = postes.filter((post) =>
        user.following.includes(post.userRef.id)
      );
      setPosts(filteredPosts);
    } else {
      setPosts(postes);
    }
  }, [feedSelectbox, postes]);
  const handleFeedSelectbox = (value: string) => {
    setFeedSelectbox(value);
  };
  const navigator = useNavigate();
  const handleNav = (post: PostData) => {
    addToPostStack(post);
    navigator(`/home/`);
  };
  return (
    <>
      <div className="feed__header">
        <h2>Home</h2>
        <div className="feed__select">
          <div
            className={`feed__selectbox ${
              feedSelectbox === "Following" && "feed__selectbox--inactive"
            }`}
            onClick={() => handleFeedSelectbox("For You")}
          >
            <div className="sub">For You</div>
            {feedSelectbox === "For You" && (
              <div className="feed__selectbox-bar"></div>
            )}
          </div>
          <div
            className={`feed__selectbox ${
              feedSelectbox === "For You" && "feed__selectbox--inactive"
            }`}
            onClick={() => handleFeedSelectbox("Following")}
          >
            <div className="sub">Following</div>
            {feedSelectbox === "Following" && (
              <div className="feed__selectbox-bar"></div>
            )}
          </div>
        </div>
      </div>
      <TweetFeed
        key={posts.length}
        posts={posts}
        handleNav={handleNav}
        postRef={db}
      />
    </>
  );
};

export default SubFeed;
