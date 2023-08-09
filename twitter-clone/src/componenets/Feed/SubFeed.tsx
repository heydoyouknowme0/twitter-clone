import React, { useEffect, useState } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import {
  DocumentData,
  DocumentReference,
  collection,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useUserAuth } from "../../auth";
import { useNavigate } from "react-router";

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

interface SubFeedProps {
  posts: PostData[];
}

const SubFeed: React.FC<SubFeedProps> = ({ posts }) => {
  const [feedSelectbox, setFeedSelectbox] = useState("For You");
  const { clearPostStack } = useUserAuth();
  useEffect(() => {
    clearPostStack();
  }, []);
  const handleFeedSelectbox = (value: string) => {
    setFeedSelectbox(value);
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
      <div className="feed__bottom">
        <TweetBox colRef={collection(db, "posts")} />
        {/* <FlipMove> */}
        {posts.map((post) => (
          <Post // TODO: fix this
            displayname={post.displayname}
            displayName={post.displayName}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
            likes={post.likes}
            postRef={post.postRef}
            key={post.postRef.id}
          />
        ))}
        {/* </FlipMove> */}
      </div>
    </>
  );
};

export default SubFeed;
