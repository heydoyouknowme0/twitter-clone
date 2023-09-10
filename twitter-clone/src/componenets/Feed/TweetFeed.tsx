import React, { useState } from "react";
import TweetBox from "./TweetBox";
import FlipMove from "react-flip-move";
import {
  DocumentData,
  DocumentReference,
  collection,
} from "firebase/firestore";
import Post from "./Post";

interface PostData {
  text: string;
  image?: string[];
  likes: number;
  userRef: DocumentReference<DocumentData>;
  postRef: DocumentReference<DocumentData>;
}

interface SubFeedProps {
  posts: PostData[];
  handleNav: (post: PostData) => void;
  postRef: any;
}

const TweetFeed: React.FC<SubFeedProps> = ({ posts, handleNav, postRef }) => {
  const [updatedPosts, setUpdatedPosts] = useState(posts); // Use state to manage posts

  const addToPosts = (post: PostData) => {
    const newPosts = [post, ...updatedPosts];
    setUpdatedPosts(newPosts);
  };
  return (
    <div className="feed__bottom">
      <TweetBox addToPosts={addToPosts} colRef={collection(postRef, "posts")} />
      <FlipMove>
        {updatedPosts.map((post) => (
          <div onClick={() => handleNav(post)}>
            <Post
              text={post.text}
              image={post.image}
              likes={post.likes}
              postRef={post.postRef}
              userRef={post.userRef}
              key={post.postRef.id}
            />
          </div>
        ))}
      </FlipMove>
    </div>
  );
};

export default TweetFeed;
